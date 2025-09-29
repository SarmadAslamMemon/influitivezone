import Link from "next/link";
import Detail1 from "../../../public/assets/imgs/portfolio/web-dev/1.jpg";
import Detail2 from "../../../public/assets/imgs/portfolio/web-dev/2.jpg";
import Detail3 from "../../../public/assets/imgs/portfolio/web-dev/mastersign-1.png";
import Detail4 from "../../../public/assets/imgs/portfolio/web-dev/mastersign-2.png";
import Detail5 from "../../../public/assets/imgs/portfolio/web-dev/mastersign-3.png";
import Detail6 from "../../../public/assets/imgs/portfolio/web-dev/mastersign-4.png";
import Detail7 from "../../../public/assets/imgs/portfolio/web-dev/mastersign-5.png";
import Detail8 from "../../../public/assets/imgs/portfolio/web-dev/home-service-1.png";
import Detail9 from "../../../public/assets/imgs/portfolio/web-dev/home-service-2.png";
import Detail10 from "../../../public/assets/imgs/portfolio/web-dev/home-service-3.png";
import Detail11 from "../../../public/assets/imgs/portfolio/web-dev/home-service-4.png";
import Detail12 from "../../../public/assets/imgs/portfolio/web-dev/home-service-5.png";
import DetailShape from "../../../public/assets/imgs/portfolio/web-dev/shape.png";
import Image from "next/image";
import { useEffect, useRef } from "react";
import animationCharCome from "@/lib/utils/animationCharCome";

const PortfolioDetailsWebsite = () => {
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
                    Website <br />
                    Development
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="portfolio__detail-content">
          <div className="container g-0 line pt-30">
            <span className="line-3"></span>
                <div className="block-content">
                    <div className="row">
                    <div className="pb-100">
                        <div className="block-gallery">
                        <Link href="https://home-services-eta.vercel.app/">  
                        <Image
                            priority
                            style={{ width: "50%", height: "auto" }}
                            src={Detail8}
                            alt="Responsive Design"
                            
                        />
                        </Link>
                        <Link href="https://home-services-eta.vercel.app/">
                        <Image
                            priority
                            style={{ width: "50%", height: "auto" }}
                            src={Detail9}
                            alt="Web Development"
                        />
                        </Link>
                        </div>

                        <div className="block-thumb">
                        <Image
                            priority
                            style={{ width: "auto", height: "auto" }}
                            src={Detail10}
                            alt="Website Showcase"
                            data-speed="0.5"
                        />
                        </div>

                        <div className="block-img-text">
                          <Link href="https://home-services-eta.vercel.app/">
                        <Image
                            priority
                            width={375}
                            style={{ height: "auto" }}
                            src={Detail11}
                            alt="Development Results"
                        />
                        </Link>
                        <Link href="https://home-services-eta.vercel.app/">
                        <Image
                            priority
                            width={375}
                            style={{ height: "auto" }}
                            src={Detail12}
                            alt="Performance Metrics"
                        />
                        </Link>
                        <p>
                            Building websites that not only look stunning but also perform exceptionally. Every element is carefully crafted to enhance user engagement and drive business success.
                        </p>
                        </div>
                    </div>

                <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 ">
                  <h2 className="portfolio__detail-title title-anim">
                    Smart Home Service Platform Solutions
                  </h2>
                </div>

                <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
                  <div className="portfolio__detail-text">
                    <p>
                        This platform redefines home services by seamlessly connecting clients and service providers. Unlike traditional websites, it empowers clients to book services with ease and gives providers the tools to showcase expertise, manage profiles, and track orders.

                        Built with Next.js, Express.js, MongoDB, and GSAP, it ensures speed, smooth animations, and a tailored user experience. Clients can browse services, schedule bookings, upload images, and get instant notifications, while providers manage services and records from a dedicated dashboard.

                        Designed for performance, scalability, and usability, the platform delivers a responsive and engaging experience across all devices.
                    </p>

                    <ul>
                      <li>+ Custom Home Service Platform</li>
                      <li>+ Dual Dashboards (Client & Service Provider)</li>
                      <li>+ Service Booking with Scheduling & Image Uploads</li>
                      <li>+ Notifications & Real-time Updates</li>
                      <li>+ Responsive Design with GSAP Animations</li>
                      <li>+ Performance Optimization & SEO</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="block-thumb">
              <Image
                priority
                style={{ width: "auto", height: "auto" }}
                src={Detail2}
                alt="Website Development Strategy"
                data-speed="0.5"
              />
            </div>

            <div className="block-content  pt-140">
              <div className="row">

                <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
                  <h2 className="portfolio__detail-title title-anim">
                    Technical architecture and development process
                  </h2>
                </div>

                <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
                  <div className="portfolio__detail-text">
                    <p>
                      At Influitive Zone, we build modern, high-performing websites that are secure, scalable, and designed to grow with your business. Our development process combines the latest technologies with industry best practices, ensuring your website not only looks great but also works flawlessly. Using agile workflows and continuous testing, we deliver websites that meet the highest standards of quality, speed, and reliability, giving your users the smooth experience they deserve.
                    </p>

                    
                  </div>
                </div>
              </div>
            </div>

            <div className="block-gallery">
                        <Link href="https://mastersigncenter.com/">  
                        <Image
                            priority
                            style={{ width: "50%", height: "auto" }}
                            src={Detail3}
                            alt="Responsive Design"
                            
                        />
                        </Link>
                        <Link href="https://mastersigncenter.com/">
                        <Image
                            priority
                            style={{ width: "50%", height: "auto" }}
                            src={Detail4}
                            alt="Web Development"
                        />
                        </Link>
                        </div>

                        <div className="block-thumb">
                        <Image
                            priority
                            style={{ width: "auto", height: "auto" }}
                            src={Detail5}
                            alt="Website Showcase"
                            data-speed="0.5"
                        />
                        </div>

                        <div className="block-img-text">
                          <Link href="https://mastersigncenter.com/">
                        <Image
                            priority
                            width={375}
                            style={{ height: "auto" }}
                            src={Detail6}
                            alt="Development Results"
                        />
                        </Link>
                        <Link href="https://mastersigncenter.com/">
                        <Image
                            priority
                            width={375}
                            style={{ height: "auto" }}
                            src={Detail7}
                            alt="Performance Metrics"
                        />
                        </Link>
                        <p>
                            Building websites that not only look stunning but also perform exceptionally. Every element is carefully crafted to enhance user engagement and drive business success.
                        </p>
                        </div>



                <div className="row pt-100">
                  <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 ">
                      <h2 className="portfolio__detail-title title-anim">
                        Master Sign Center
                      </h2>
                  </div>

                  <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
                    <div className="portfolio__detail-text">
                      <p>
                          This platform transforms traditional printing and signage shopping into a modern digital experience. Unlike standard e-commerce stores, it not only offers ready-made products across categories like expo displays, laser engraving, decals, banners, and signs, but also empowers customers to design their own. With a built-in template editor similar to Canva, users can create fully customized designs for products such as banners, stickers, promotional items, and vehicle wraps—all directly from the website.

                          Built with Next.js for the frontend and Firebase for the backend, the platform ensures fast performance, real-time updates, and a seamless user journey. Customers can easily browse categories, select products, edit templates, preview their designs, and place orders with confidence. From indoor and outdoor signs to privacy, marketing, and accessories, every detail is designed for flexibility and creativity.

                          The system is optimized for scalability, responsiveness, and ease of use, ensuring a smooth shopping and designing experience across all devices.
                      </p>

                      <ul>
                        <li>+ Modern E-commerce Platform for Printing & Signage</li>
                        <li>+ Ready-made Products Across Multiple Categories</li>
                        <li>+ Built-in Canva-like Template Editor for Custom Designs</li>
                        <li>+ Real-time Updates with Firebase</li>
                        <li>+ Responsive Design & Optimized Performance</li>
                        <li>+ Scalable and User-friendly Shopping Experience</li>
                      </ul>
                    </div>
                  </div>
                </div>

            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                <div className="portfolio__detail-btns pt-150 pb-150">
                  <Link
                    href="/portfolio-details-marketing"
                    className="wc-btn-primary btn-hover"
                  >
                    <span></span> Prev Work
                  </Link>
                  <Link
                    href="/portfolio-details-mobile"
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

export default PortfolioDetailsWebsite;