import { useEffect } from "react";
let gsap;
let ScrollTrigger;

if (typeof window !== "undefined") {
  gsap = require("gsap").gsap;
  ScrollTrigger = require("gsap/ScrollTrigger").ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
}
import Link from "next/link";
import Blog11 from "../../../public/assets/imgs/blog/1/1.jpg";
import Blog12 from "../../../public/assets/imgs/blog/1/2.jpg";
import Blog13 from "../../../public/assets/imgs/blog/1/3.jpg";
import Image from "next/image";

const DigitalAgencyBlog = () => {
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
      <section className="blog__area no-pb blog__animation">
        <div className="container g-0 line pt-150 pb-150">
          <span className="line-3"></span>
          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
              <div className="sec-title-wrapper">
                <h2 className="sec-sub-title">recent blog</h2>
                <h3 className="sec-title">News insignt</h3>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
              <article className="blog__item">
                <div className="blog__img-wrapper">
                  <Link href="/blog-details/2">
                    <div className="img-box">
                      <Image
                        priority
                        style={{ width: "auto", height: "auto" }}
                        className="image-box__item"
                        src={Blog11}
                        alt=""
                      />
                      <Image
                        priority
                        style={{ width: "auto", height: "auto" }}
                        className="image-box__item"
                        src={Blog11}
                        alt=""
                      />
                    </div>
                  </Link>
                </div>
                <h4 className="blog__meta">
                  <Link href="/category">IT Solutions / Business Technology</Link> . 02 May 2019
                </h4>
                <h5>
                  <Link href="/blog-details/2" className="blog__title">
                  The Role of IT Solutions in Building a Modern Digital Business
                  </Link>
                </h5>
                <Link href="/blog-details/2" className="blog__btn">
                  Read More{" "}
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </Link>
              </article>
            </div>

            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
              <article className="blog__item">
                <div className="blog__img-wrapper">
                  <Link href="/blog-details/1">
                    <div className="img-box">
                      <Image
                        priority
                        style={{ width: "auto", height: "auto" }}
                        className="image-box__item"
                        src={Blog12}
                        alt=""
                      />
                      <Image
                        priority
                        style={{ width: "auto", height: "auto" }}
                        className="image-box__item"
                        src={Blog12}
                        alt=""
                      />
                    </div>
                  </Link>
                </div>
                <h4 className="blog__meta">
                  <Link href="/category">Branding / Digital Strategy</Link> . 02 May 2019
                </h4>
                <h5>
                  <Link href="/blog-details/1" className="blog__title">
                  How a Strong Brand Strategy Can Transform Your Business Online
                  </Link>
                </h5>
                <Link href="/blog-details/1" className="blog__btn">
                  Read More{" "}
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </Link>
              </article>
            </div>

            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
              <article className="blog__item">
                <div className="blog__img-wrapper">
                  <Link href="/blog-details/3">
                    <div className="img-box">
                      <Image
                        priority
                        style={{ width: "auto", height: "auto" }}
                        className="image-box__item"
                        src={Blog13}
                        alt="Blog Thumbnail"
                      />
                      <Image
                        priority
                        style={{ width: "auto", height: "auto" }}
                        className="image-box__item"
                        src={Blog13}
                        alt="Blog Thumbnail"
                      />
                    </div>
                  </Link>
                </div>
                <h4 className="blog__meta">
                  <Link href="/category">Digital Marketing / Growth Strategy</Link> . 02 May 2019
                </h4>
                <h5>
                  <Link href="/blog-details/3" className="blog__title">
                  Maximizing Your Digital Presence: A Complete Marketing Strategy Guide
                  </Link>
                </h5>
                <Link href="/blog-details/3" className="blog__btn">
                  Read More{" "}
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </Link>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DigitalAgencyBlog;
