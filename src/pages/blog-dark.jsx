import Head from "next/head";
import RootLayout from "@/components/common/layout/RootLayout";
import Blog1 from "@/components/blog/Blog1";
import DigitalAgencyCTA from "@/components/cta/DigitalAgencyCTA";

const BlogDark = () => {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Blog Dark Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <RootLayout defaultMode="dark">
          <Blog1 />
          <DigitalAgencyCTA />
        </RootLayout>
      </main>
    </>
  );
};

export default BlogDark;
