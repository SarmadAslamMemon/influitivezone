import Image from "next/image";
import Link from "next/link";

import Author from "../../../public/assets/imgs/blog/detail/author.png";
import Detail1 from "../../../public/assets/imgs/blog/detail/1.jpg";
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
                  Design, Marketing <span>25 Jan 2019</span>
                </h2>
                <h3
                  className="blog__detail-title animation__word_come"
                  ref={wordAnim2}
                >
                  Share your design to help new designers learn and grow
                </h3>
                <div className="blog__detail-metalist">
                  {/* <div className="blog__detail-meta">
                    <Image
                      priority
                      style={{ width: "auto", height: "auto" }}
                      src={Author}
                      alt="Author Picture"
                    />
                    <p>
                      Writen by <span>Codexpand</span>
                    </p>
                  </div> */}
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
                  We are passionate about turning creative designs into functional websites, and I focus on achieving this with the right front-end tools. While I prefer modern JavaScript libraries like React.js, I always choose what best suits a website’s needs. Many businesses consider a rebrand for different reasons, and it doesn’t always mean failure. Instead, rebranding can signal growth, adaptation, and the opportunity to present a stronger identity that connects better with their target audience.{" "}
                </p>
                <p>
                  To help you understand the origin of this mistaken belief held by those who condemn pleasure and glorify pain, I will clarify the matter fully, explaining the very words once spoken by the seeker of truth, the visionary who can rightly be called the builder and architect of a fulfilling, meaningful, and truly happy life.
                </p>
                <Image
                  priority
                  width={850}
                  style={{ height: "auto" }}
                  src={Detail2}
                  alt="Blog Image"
                />
                <h2>JavaScript</h2>
                <p>
                  We love transforming creative designs into functional digital experiences, and I strive to achieve this using the front-end tools required. While my preference leans toward modern JavaScript libraries such as React.js, I always choose what aligns best with a website’s needs. There are many reasons why a business may decide on a rebrand, and it does not always suggest failure—it can instead highlight growth, adaptability, and the chance to create a stronger brand identity.
                </p>
                <h2>Fremework</h2>
                <p>
                  Always striving to push boundaries, especially with our own platform, we bring an analytical approach to crafting websites that are both visually captivating and optimized for peak performance. Each project reflects a unique journey, helping to tell a compelling story that builds understanding and inspires action. Our goal is always to design a site that is visually engaging, strategically structured, and fully optimized to deliver maximum performance while connecting with its intended audience.
                </p>
                <ul>
                  <li>Brand Development</li>
                  <li>UX/UI Design</li>
                  <li>Front-end Development</li>
                  <li>Copywriting</li>
                  <li>Shopify Development</li>
                </ul>
                <h2>Visual Studio</h2>
                <p>
                  Just like other pseudo-elements and pseudo-class selectors,
                  :not() can be chained with other pseudo-classes and
                  pseudo-elements. For example, the following will add a “New!”
                  word to list items that do not have a .old class name, using
                  the ::after pseudo-element:
                </p>
                <Image
                  priority
                  width={850}
                  style={{ height: "auto" }}
                  src={Detail3}
                  alt="Code"
                />
              </div>
              <div className="blog__detail-tags">
                <p className="sub-title-anim">
                  tags: <Link href="/blog">design</Link>,{" "}
                  <Link href="/blog">figma</Link>,
                  <Link href="/tag">update</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails1;
