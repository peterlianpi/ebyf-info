import Head from "next/head";

const FallbackPage = () => (
  <>
    <Head>
      <title>EBYF Contacts Info</title>
    </Head>
    <p className="font-semibold text-center mt-4">This is offline fallback page</p>
    <p className="text-center mt-4">
      When offline, any page route will fallback to this page
    </p>
  </>
);

export default FallbackPage;
