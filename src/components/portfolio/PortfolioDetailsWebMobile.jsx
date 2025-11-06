import Link from "next/link";
import Detail1 from "../../../public/assets/imgs/portfolio/web-app/1.jpg";
import Detail2 from "../../../public/assets/imgs/portfolio/web-app/2.jpg";
// import Detail3 from "../../../public/assets/imgs/portfolio/web-app/3.jpg";
// import Detail4 from "../../../public/assets/imgs/portfolio/web-app/4.jpg";
import Detail5 from "../../../public/assets/imgs/portfolio/web-app/5.jpg";
// import Detail6 from "../../../public/assets/imgs/portfolio/web-app/6.jpg";
// import Detail7 from "../../../public/assets/imgs/portfolio/web-app/7.jpg";
import DetailShape from "../../../public/assets/imgs/portfolio/web-app/shape.png";
import Image from "next/image";
import { useEffect, useRef } from "react";
import animationCharCome from "@/lib/utils/animationCharCome";

const PortfolioDetailsWebMobile = () => {
  const charAnim = useRef();
  useEffect(() => {
    animationCharCome(charAnim.current);
  }, []);
  return (
    <>
      <section className="portfolio__detail">
        <div className="portfolio__detail-top">
          <div className="container g-0 line pt-110 pb-130">
            <span className="line-3"></span>

            <div className="row">
              <div className="col-xxl-8 col-xl-8 col-lg-7 col-md-7">
                <div className="sec-title-wrapper">
                  <h2 className="sec-title animation__char_come" ref={charAnim}>
                    Mobile <br />
                    Development
                  </h2>
                </div>
              </div>
             </div>
          </div>
        </div>

        <Link href="https://play.google.com/store/search?q=wasooli&c=apps&hl=en-us">
        <div className="portfolio__detail-thumb">
          <Image
            priority
            style={{ width: "auto", height: "auto" }}
            src={Detail1}
            alt="Web & Mobile Development Portfolio"
            data-speed="auto"
          />
        </div>
        </Link>

        <div className="portfolio__detail-content">
          <div className="container g-0 line pt-140">
            <span className="line-3"></span>

            <div className="block-content">
              <div className="row">
                <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
                  <h2 className="portfolio__detail-title title-anim">
                    Modern Mobile Applications and Seamless Digital Solutions
                  </h2>
                </div>

                <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
                  <div className="portfolio__detail-text">
                    <p>
                      At Influitive Zone, we’re passionate about creating mobile apps that people love to use. Our team focuses on building fast, scalable, and easy-to-use apps that run smoothly on both iOS and Android. Whether it’s a native app or a cross-platform solution, we make sure your idea turns into a reliable product with a great user experience. From design to deployment, we handle everything with clean code and modern technology to help your app stand out in today’s digital world.
                    </p>

                    <ul>
                      <li>+ Native & Cross-Platform Mobile Apps</li>
                      <li>+ iOS and Android Development</li>
                      <li>+ Beautiful, user-friendly Mobile UI/UX Design</li>
                      <li>+ Secure API Integration & Backend Systems</li>
                      <li>+ Database and Cloud-Connected Apps</li>
                      <li>+ App Store Optimization & Continuous Updates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Link href="https://play.google.com/store/apps/details?id=com.surah_yasin_urdu_arabic&hl=en-us">
            <div className="block-thumb">
              <Image
                priority
                style={{ width: "auto", height: "auto" }}
                src={Detail2}
                alt="Development Process"
                data-speed="0.5"
              />
            </div>
            </Link>

            <div className="block-content  pt-140">
              <div className="row">
                <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
                  <h2 className="portfolio__detail-title title-anim">
                    Technology stack and architecture
                  </h2>
                </div>

                <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
                  <div className="portfolio__detail-text">
                    <p>
                      At Influitive Zone, we build mobile apps with a focus on performance, scalability, and reliability. Our development process follows modern practices and the latest technologies to ensure your app is not only functional but also future-ready. Using tools like React Native, Flutter, and native iOS/Android frameworks, we create apps that are fast, secure, and easy to maintain. We make sure your mobile solution delivers a smooth experience across all devices and platforms, so your users stay engaged and satisfied.</p>
                    
                  </div>
                </div>
              </div>
            </div>

            <Link href="https://play.google.com/store/apps/details?id=com.digi_tasbeeh.counters">
            <div className="block-thumb">
              <Image
                priority
                style={{ width: "auto", height: "auto" }}
                src={Detail5}
                alt="Development Showcase"
                data-speed="0.5"
              />
            </div>
            </Link>

            <div className="block-img-text">
              <p>
                Creating digital experiences that connect users to your brand through intuitive interfaces and seamless functionality. Every line of code is crafted with precision to deliver excellence.
              </p>
            </div>

            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                <div className="portfolio__detail-btns pt-150 pb-150">
                  <Link
                    href="/portfolio-details-website"
                    className="wc-btn-primary btn-hover"
                  >
                    <span></span> Prev Work
                  </Link>
                  <Link
                    href="/portfolio-details-graphic"
                    className="wc-btn-primary btn-hover"
                  >
                    <span></span> Next Work
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioDetailsWebMobile;