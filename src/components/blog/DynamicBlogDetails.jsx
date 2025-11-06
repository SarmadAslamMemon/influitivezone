import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import animationWordCome from "@/lib/utils/animationWordCome";

const DynamicBlogDetails = ({ blogData }) => {
  const wordAnim = useRef();
  const wordAnim2 = useRef();
  
  useEffect(() => {
    // Add a small delay to ensure DOM elements are rendered
    const timer = setTimeout(() => {
      if (wordAnim.current) {
        animationWordCome(wordAnim.current);
      }
      if (wordAnim2.current) {
        animationWordCome(wordAnim2.current);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Safety check for blogData
  if (!blogData) {
    return <div>Loading...</div>;
  }

  const renderContent = (content) => {
    return content.map((item, index) => {
      switch (item.type) {
        case "paragraph":
          return (
            <p key={index}>
              {item.text}
            </p>
          );
        case "heading":
          return (
            <h2 key={index}>{item.text}</h2>
          );
         case "image":
           return (
             <Image
               key={index}
               priority
               width={850}
               height={400}
               style={{ height: "auto" }}
               src={item.src}
               alt={item.alt}
               unoptimized
             />
           );
        case "list":
          return (
            <ul key={index}>
              {item.items.map((listItem, listIndex) => (
                <li key={listIndex}>{listItem}</li>
              ))}
            </ul>
          );
        default:
          return null;
      }
    });
  };

  return (
    <>
      <section className="blog__detail">
        <div className="container g-0 line pt-140">
          <span className="line-3"></span>
          <div className="row">
            <div className="col-xxl-8 col-xl-10 offset-xxl-2 offset-xl-1">
              <div className="blog__detail-top">
                <h2
                  className="blog__detail-date animation__word_come"
                  ref={wordAnim}
                >
                  {blogData.category} <span>{blogData.date}</span>
                </h2>
                <h3
                  className="blog__detail-title animation__word_come"
                  ref={wordAnim2}
                >
                  {blogData.title}
                </h3>
                <div className="blog__detail-metalist">
                  <div className="blog__detail-meta">
                    <p>
                      Viewed <span>{blogData.readTime}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
             <div className="col-xxl-12">
               <div className="blog__detail-thumb">
                 <Image
                   priority
                   width={1200}
                   height={600}
                   style={{ width: "auto", height: "auto" }}
                   src={blogData.image}
                   alt="Blog Thumbnail"
                   data-speed="0.5"
                   unoptimized
                 />
               </div>
             </div>
            <div className="col-xxl-8 col-xl-10 offset-xxl-2 offset-xl-1">
              <div className="blog__detail-content">
                {renderContent(blogData.content)}
              </div>
              {blogData.tags && blogData.tags.length > 0 && (
                <div className="blog__detail-tags">
                  <p className="sub-title-anim">
                    tags: {blogData.tags.map((tag, index) => (
                      <span key={index}>
                        <Link href={tag.href}>{tag.name}</Link>
                        {index < blogData.tags.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DynamicBlogDetails;
