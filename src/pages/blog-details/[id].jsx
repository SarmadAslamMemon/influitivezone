import Head from "next/head";
import { useRouter } from "next/router";
import RootLayout from "@/components/common/layout/RootLayout";
import DynamicBlogDetails from "@/components/blog/DynamicBlogDetails";
import DynamicBlogRelated from "@/components/blog/DynamicBlogRelated";
import DigitalAgencyCTA from "@/components/cta/DigitalAgencyCTA";
import { getBlogById, getRelatedBlogs } from "@/data/blogData";

const BlogDetailsPage = ({ blogData, relatedBlogs }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!blogData) {
    return (
      <div>
        <h1>Blog not found</h1>
        <p>The blog you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{blogData.title} - Blog Details</title>
        <meta name="description" content={`${blogData.title} - ${blogData.category}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <RootLayout defaultMode="dark">
          <DynamicBlogDetails blogData={blogData} />
          <DynamicBlogRelated relatedBlogs={relatedBlogs} />
          <DigitalAgencyCTA />
        </RootLayout>
      </main>
    </>
  );
};

export async function getStaticPaths() {
  const { getAllBlogIds } = await import("@/data/blogData");
  const paths = getAllBlogIds().map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { getBlogById, getRelatedBlogs } = await import("@/data/blogData");
  
  const blogData = getBlogById(params.id);
  const relatedBlogs = getRelatedBlogs(params.id);

  if (!blogData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blogData,
      relatedBlogs,
    },
  };
}

export default BlogDetailsPage;
