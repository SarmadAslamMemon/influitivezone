import { useEffect } from "react";
let gsap;
let ScrollTrigger;

if (typeof window !== "undefined") {
  gsap = require("gsap").gsap;
  ScrollTrigger = require("gsap/ScrollTrigger").ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
}
import Link from "next/link";
import Image from "next/image";

const DynamicBlogRelated = ({ relatedBlogs }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        gsap.set(".blog__animation .blog__item", { x: 50, opacity: 0 });

        if (device_width < 1023) {
          const blogList = gsap.utils.toArray(".blog__animation .blog__item");
          blogList.forEach((item, i) => {
            let blogTl = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: "top center+=200",
              },
            });
            blogTl.to(item, {
              x: 0,
              opacity: 1,
              ease: "power2.out",
              duration: 1.5,
            });
          });
        } else {
          gsap.to(".blog__animation .blog__item", {
            scrollTrigger: {
              trigger: ".blog__animation .blog__item",
              start: "top center+=300",
              markers: false,
            },
            x: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 2,
            stagger: {
              each: 0.3,
            },
          });
        }
      });
      return () => tHero.revert();
    }
  }, []);

  return (
    <>
      <section className="blog__related blog__animation">
        <div className="container g-0 line pt-130 pb-140">
          <span className="line-3"></span>
          <div className="row">
            <div className="col-xxl-12">
              <div className="sec-title-wrapper">
                <h2 className="sec-title title-anim">Related Articles</h2>
              </div>
            </div>
          </div>

          <div className="row reset-grid">
            {relatedBlogs.map((blog, index) => (
              <div key={blog.id} className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
                <article className="blog__item" style={{ position: 'relative' }}>
                  <div className="blog__img-wrapper" style={{ textAlign: 'center' }}>
                    <Link href={`/blog-details/${blog.id}`}>
                      <div className="img-box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                          priority
                          width={400}
                          height={300}
                          style={{ width: "auto", height: "auto", maxWidth: "100%", height: "auto" }}
                          className="image-box__item"
                          src={blog.image}
                          alt="Blog Thumbnail"
                          unoptimized
                        />
                        <Image
                          priority
                          width={400}
                          height={300}
                          style={{ width: "auto", height: "auto", maxWidth: "100%", height: "auto" }}
                          className="image-box__item"
                          src={blog.image}
                          alt="Blog Thumbnail"
                          unoptimized
                        />
                      </div>
                    </Link>
                  </div>
                  <h4 className="blog__meta sub-title-anim">
                    <Link href="/category">{blog.category.split(' / ')[0]}</Link> . {blog.date}
                  </h4>
                  <h5>
                    <Link
                      href={`/blog-details/${blog.id}`}
                      className="blog__title sub-title-anim"
                    >
                      {blog.title}
                    </Link>
                  </h5>
                  <Link href={`/blog-details/${blog.id}`} className="blog__btn">
                    Read More{" "}
                    <span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </Link>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DynamicBlogRelated;
