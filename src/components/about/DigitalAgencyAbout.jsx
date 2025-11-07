import { useEffect, useRef } from "react";
let gsap;
let ScrollTrigger;
let ScrollSmoother;

if (typeof window !== "undefined") {
  gsap = require("gsap").gsap;
  ScrollTrigger = require("gsap/ScrollTrigger").ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
  
  // Load ScrollSmoother dynamically
  try {
    ScrollSmoother = require("../../../public/assets/gsap-plugins/ScrollSmoother.min").default;
    gsap.registerPlugin(ScrollSmoother);
  } catch (error) {
    console.warn("ScrollSmoother not available:", error);
  }
}
import Link from "next/link";
import Image from "next/image";
import About11 from "../../../public/assets/imgs/about/1/1.jpg";
import About12 from "../../../public/assets/imgs/about/1/2.jpg";

const DigitalAgencyAbout = () => {

  useEffect(() => {
    if (typeof window !== "undefined" && ScrollSmoother) {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        ScrollSmoother.create({
          smooth: 1.35,
          effects: device_width < 1025 ? false : true,
          smoothTouch: false,
          normalizeScroll: false,
          ignoreMobileResize: true,
        });
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <style jsx>{`
        /* Mobile Responsive Styles for About Section */
        @media only screen and (max-width: 767px) {
          .about__area {
            padding: 40px 0 !important;
          }
          
          .about__area .container {
            padding-left: 15px !important;
            padding-right: 15px !important;
            padding-top: 60px !important;
            padding-bottom: 60px !important;
          }
          
          .about__title-wrapper {
            margin-bottom: 30px !important;
            text-align: center !important;
          }
          
          .about__title-wrapper .sec-title {
            font-size: 24px !important;
            line-height: 1.4 !important;
            text-align: center !important;
            padding: 0 10px !important;
          }
          
          .about__content-wrapper {
            display: flex !important;
            flex-direction: column !important;
            gap: 30px !important;
            align-items: center !important;
          }
          
          .about__img {
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 20px !important;
            order: 1 !important;
          }
          
          .about__img_left {
            width: 100% !important;
            max-width: 100% !important;
            text-align: center !important;
            margin: 0 !important;
          }
          
          .about__img_left img {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            object-fit: cover !important;
            border-radius: 10px !important;
          }
          
          .about__img-right {
            width: 100% !important;
            max-width: 280px !important;
            text-align: center !important;
            position: relative !important;
            margin: 0 auto !important;
          }
          
          .about__img-right img {
            width: 100% !important;
            max-width: 280px !important;
            height: auto !important;
            object-fit: cover !important;
            border-radius: 10px !important;
            display: block !important;
            margin: 0 auto !important;
          }
          
          .about__img-right .shape {
            display: none !important;
          }
          
          .about__content {
            width: 100% !important;
            order: 2 !important;
            text-align: center !important;
            padding: 0 !important;
          }
          
          .about__content p {
            font-size: 16px !important;
            line-height: 1.6 !important;
            text-align: center !important;
            padding: 0 10px !important;
            margin-bottom: 25px !important;
            color: white !important;
          }
          
          .about__content .cursor-btn {
            text-align: center !important;
            margin-top: 20px !important;
            display: flex !important;
            justify-content: center !important;
          }
          
          .about__content .btn-item {
            padding: 14px 28px !important;
            font-size: 15px !important;
            white-space: nowrap !important;
          }
        }
        
        /* Extra Small Devices */
        @media only screen and (max-width: 480px) {
          .about__area .container {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
          
          .about__title-wrapper .sec-title {
            font-size: 20px !important;
            line-height: 1.3 !important;
            padding: 0 5px !important;
          }
          
          .about__content p {
            font-size: 14px !important;
            line-height: 1.5 !important;
            padding: 0 5px !important;
          }
          
          .about__img-right {
            max-width: 240px !important;
          }
          
          .about__img-right img {
            max-width: 240px !important;
          }
          
          .about__content .btn-item {
            padding: 12px 24px !important;
            font-size: 14px !important;
          }
        }
        
        /* Tablet Styles */
        @media only screen and (min-width: 768px) and (max-width: 1024px) {
          .about__content-wrapper {
            flex-direction: column !important;
            gap: 40px !important;
          }
          
          .about__img {
            flex-direction: row !important;
            justify-content: center !important;
            gap: 30px !important;
          }
          
          .about__img_left {
            flex: 1 !important;
            max-width: 50% !important;
          }
          
          .about__img-right {
            flex: 1 !important;
            max-width: 40% !important;
          }
        }
      `}</style>
      <section className="about__area">
        <div className="container line g-0 pt-140 pb-130">
          <span className="line-3"></span>
          <div className="row">
            <div className="col-xxl-12">
              <div className="about__title-wrapper">
                <div className="title-with-animation">
                  <h3 className="sec-title title-anim">
                    We unlock the potential of your business with creative design
                  </h3>
                </div>
              </div>

              <div className="about__content-wrapper">
                <div className="about__img">
                  <div className="img-anim about__img_left">
                    <Image
                      priority
                      style={{ width: "auto", height: "auto" }}
                      src={About11}
                      alt="About Image"
                      data-speed="0.3"
                    />
                  </div>

                  <div className="about__img-right">
                    <Image
                      priority
                      width={220}
                      style={{ height: "auto" }}
                      src={About12}
                      alt="About Image Right"
                      data-speed="0.5"
                    />
                    <div className="shape">
                      <div className="secondary" data-speed="0.9"></div>
                      <div className="primary"></div>
                    </div>
                  </div>
                </div>

                <div className="about__content text-anim">
                  <p>
                    We believe every business has a story worth sharing. Through thoughtful and creative design, we bring your vision to life in a way that feels authentic, connects with your audience, and helps your brand grow with confidence. Our mission is simple: design that makes people remember you.
                  </p>

                  <div className="cursor-btn btn_wrapper">
                    <Link
                      className="btn-item wc-btn-primary btn-hover"
                      href="/about"
                    >
                      <span></span> Explore Us{" "}
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DigitalAgencyAbout;
