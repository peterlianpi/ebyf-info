import React from "react";

function PolicyPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="">
        <h1 className="text-center text-2xl font-semibold pb-4">
          Privacy Policy
        </h1>
        <p>
          <strong>1. Data Collection:</strong> We collect personal information
          such as names, contact details, and profile information from users who
          register on our platform. Additionally, user-generated content such as
          images may be collected and stored on our servers.
        </p>
        <br />
        <p>
          <strong>2. Use of Information:</strong> The information collected is
          used to facilitate communication and interaction among church youth
          members. User profiles allow for easy access to contact information
          and updates within the community.
        </p>
        <br />
        <p>
          <strong>3. Data Storage and Security:</strong> User data, including
          personal information and images, is stored securely on MongoDB
          databases and S3 cloud servers. We employ industry-standard security
          measures to protect against unauthorized access or misuse of data.
        </p>
        <br />
        <p>
          <strong>4. Sharing of Information:</strong> User information is not
          shared with third parties without explicit consent. However,
          user-generated content may be visible to other registered users within
          the platform.
        </p>
        <br />
        <p>
          <strong>5. Access and Control:</strong> Users have the right to
          access, update, or delete their personal information stored on our
          platform. They can do so by accessing their profile settings or
          contacting the site administrator.
        </p>
        <br />
        <p>
          <strong>6. Consent:</strong> By using our platform and providing
          personal information, users consent to the collection, storage, and
          use of their data as outlined in this Privacy Policy.
        </p>
        <br />
        <p>
          <strong>7. Changes to Policy:</strong> We reserve the right to update
          or modify this Privacy Policy at any time. Users will be notified of
          any changes, and continued use of the platform constitutes acceptance
          of the revised policy.
        </p>
        <br />
        <p>
          <strong>Other Requirements Context:</strong> The web app serves as a
          centralized platform for church youth members, including 12 main youth
          leaders, 17 leaders of group divisions, and other active members, to
          connect and communicate effectively. Users can create profiles, update
          their contact information, and contribute to the community by sharing
          updates and announcements. All data, including personal information
          and images, is securely stored on MongoDB databases and S3 cloud
          servers. The platform prioritizes user privacy and employs
          industry-standard security measures to safeguard sensitive
          information.
        </p>
      </div>
    </div>
  );
}

export default PolicyPage;
