import Head from "next/head";

const FallbackPage = () => (
  <>
    <Head>
      <title>EBYF Contacts Info</title>
    </Head>
    <p className="font-semibold text-center mt-4">You are offline</p>
    <p className="text-center mt-4">
      Check your internet connection and try again.
    </p>
  </>
);

export default FallbackPage;
