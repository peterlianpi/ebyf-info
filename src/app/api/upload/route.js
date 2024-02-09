import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req, res) {
  const data = await req.formData();
  if (data.get("file")) {
    // upload file
    const file = data.get("file");

    const s3Client = new S3Client({
      endpoint: process.env.FILEBASE_ENDPOINT_URL,
      region: "us-east-1",
      signatureVersion: "v4",
      credentials: {
        accessKeyId: process.env.FILEBASE_ACCESS_KEY_ID,
        secretAccessKey: process.env.FILEBASE_SECRET_ACCESS_KEY,
      },
    });

    const ext = file.name.split(".").slice(-1)[0];
    const newFileName = `ebyf-photo-2024/${uniqid()}.${ext}`; // Specify the folder path here
    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    const bucket = process.env.FILEBASE_BUCKET_NAME;

    // Construct URL with CID
    let link = "";

    try {
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: newFileName,
        ACL: "public-read",
        ContentType: file.type,
        Body: buffer,
      });

      // Add middleware to extract CID from response headers
      command.middlewareStack.add(
        (next) => async (args) => {
          const response = await next(args);

          // Check if request is incoming as middle works both ways
          if (!response.response.statusCode) return response;

          // Get CID from response headers
          const cid = response.response.headers["x-amz-meta-cid"];

          // Resign url
          link = `https://ipfs.filebase.io/ipfs/${cid}`;

          return response;
        },
        {
          step: "build",
          name: "addCidToOutput",
        }
      );

      await s3Client.send(command);

      // Response with success along with the URL in the response
      return Response.json(link);
    } catch (error) {
      console.error("Error uploading file : ", error);
      // Handle error response
      return Response.json({ error: "Failed to upload file" });
    }
  }

  return Response.json({ error: "No file provided" });
}
