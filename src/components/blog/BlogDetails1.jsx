import Image from "next/image";
import Link from "next/link";

import Author from "../../../public/assets/imgs/blog/detail/author.png";
import Detail1 from "../../../public/assets/imgs/blog/detail/blog1.png";
import Detail2 from "../../../public/assets/imgs/blog/detail/2.jpg";
import Detail3 from "../../../public/assets/imgs/blog/detail/3.jpg";
import { useEffect, useRef } from "react";
import animationWordCome from "@/lib/utils/animationWordCome";

const BlogDetails1 = () => {
  const wordAnim = useRef();
  const wordAnim2 = useRef();
  useEffect(() => {
    animationWordCome(wordAnim.current);
    animationWordCome(wordAnim2.current);
  }, []);
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
                  Web & App Design / UI-UX <span>25 Jan 2019</span>
                </h2>
                <h3
                  className="blog__detail-title animation__word_come"
                  ref={wordAnim2}
                >
                  The Future of Web & App Design: Trends to Watch in 2025
                </h3>
                <div className="blog__detail-metalist">
                  <div className="blog__detail-meta">
                    <p>
                      Viewed <span>3 min read</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-12">
              <div className="blog__detail-thumb">
                <Image
                  priority
                  style={{ width: "auto", height: "auto" }}
                  src={Detail1}
                  alt="Blog Thumbnail"
                  data-speed="0.5"
                />
              </div>
            </div>
            <div className="col-xxl-8 col-xl-10 offset-xxl-2 offset-xl-1">
              <div className="blog__detail-content">
                <p>
                  The digital world is always changing, and how people engage with websites and apps is greatly influenced by design.  As 2025 approaches, companies need to adjust to new trends that enhance user experience in addition to being aesthetically pleasing.
                </p>
                <p>
                  AI-driven design is among the most prominent trends.  Designers can now automate layouts, anticipate user wants, and develop individualized user experiences with the use of artificial intelligence tools.  This translates into more intelligent digital goods and quicker design cycles.
                </p>
                <p>
                  Motion design and micro-interactions are another trend.  Apps and websites are more engaging when they have subtle animations that lead users through each step with ease.  These designs maintain cleanliness and modernity while improving usefulness when combined with minimalist aesthetics.{" "}
                </p>
                <p>
                  Additionally, diversity and accessibility are becoming unavoidable.  People of various abilities can interact with a well-designed platform with ease.  Important advancements include the addition of voice navigation, high contrast images, and responsive layouts.
                </p>
                <p>
                  Businesses may remain ahead of the competition by keeping up with these design trends.  Our agency welcomes innovation in order to provide apps and websites that not only look good but also produce tangible outcomes.
                </p>
              </div>
              {/* <div className="blog__detail-tags">
                <p className="sub-title-anim">
                  tags: <Link href="/blog">design</Link>,{" "}
                  <Link href="/blog">figma</Link>,
                  <Link href="/tag">update</Link>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails1;
