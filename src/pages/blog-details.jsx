import { useEffect } from "react";
import { useRouter } from "next/router";

const BlogDetailsDark = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new dynamic route
    router.replace("/blog-details/1");
  }, [router]);

  return null;
};

export default BlogDetailsDark;
