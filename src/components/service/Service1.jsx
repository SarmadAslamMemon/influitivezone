import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Link from "next/link";
import Service11 from "../../../public/assets/imgs/service/1.png";
import Service14 from "../../../public/assets/imgs/service/2.png";
import Service12 from "../../../public/assets/imgs/service/3.png";
import Service13 from "../../../public/assets/imgs/service/4.png";
import Service15 from "../../../public/assets/imgs/service/5.png";
import Service16 from "../../../public/assets/imgs/service/6.png";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Service1 = () => {
  const [activeService, setActiveService] = useState(1);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        if (device_width > 1200) {
          gsap.to(".service__list-6", {
            scrollTrigger: {
              trigger: ".service__area-6",
              pin: ".service__list-6",
              pinSpacing: true,
              start: "top top",
              end: "bottom bottom",
            },
          });

          gsap.to(".service__image-wrap", {
            scrollTrigger: {
              trigger: ".service__area-6",
              pin: ".mid-content",
              pinSpacing: true,
              start: "top top",
              end: "bottom bottom",
              markers: false,
            },
          });

          let service_images = gsap.utils.toArray(".service__image");
          let service_imagess = gsap.utils.toArray(".service__image img");
          let service_items = gsap.utils.toArray(".service__item-6");

          if (service_items) {
            service_items.forEach((image, i) => {
              let tl = gsap.timeline({
                scrollTrigger: {
                  trigger: image,
                  scrub: 1,
                  start: "top top-=600",
                  markers: false,
                },
              });
              tl.to(service_images[i], {
                zIndex: "1",
              });
              tl.to(
                service_imagess[i],
                {
                  opacity: 0,
                  duration: 1,
                  scale: 1.2,
                  ease: "power4.out",
                },
                "-=1"
              );
            });
          }

          let navItems = gsap.utils.toArray(".service__list-6 li a");
          if (navItems) {
            navItems.forEach((nav) => {
              nav.addEventListener("click", (e) => {
                e.preventDefault();
                const ids = nav.getAttribute("href");
                gsap.to(window, {
                  duration: 0.5,
                  scrollTo: ids,
                  ease: "power4.out",
                });
              });
            });
          }

          // Add scroll detection for active service highlighting
          const serviceItems = gsap.utils.toArray(".service__item-6");
          serviceItems.forEach((item, index) => {
            ScrollTrigger.create({
              trigger: item,
              start: "top center",
              end: "bottom center", 
              onEnter: () => setActiveService(index + 1),
              onEnterBack: () => setActiveService(index + 1),
            });
          });
        }
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <section className="service__area-6">
        <div className="container">
          <div className="row inherit-row">
            <div className="col-xxl-12">
              <div className="content-wrapper">
                <div className="left-content">
                  <ul className="service__list-6">
                    <li>
                      <a href="#service_1" className={activeService === 1 ? 'active' : ''}>
                        Mobile <br />
                        Development
                      </a>
                    </li>
                    <li>
                      <a href="#service_2" className={activeService === 2 ? 'active' : ''}>
                        Interaction <br />
                        Design
                      </a>
                    </li>
                    <li>
                      <a href="#service_3" className={activeService === 3 ? 'active' : ''}>
                        Digital <br />
                        Marketing
                      </a>
                    </li>
                    <li>
                      <a href="#service_4" className={activeService === 4 ? 'active' : ''}>
                        Website <br />
                        Development
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="mid-content">
                  <div className="service__image">
                    <Image
                      priority
                      style={{ width: "auto", height: "auto" }}
                      src={Service11}
                      alt="Service Image"
                    />
                  </div>
                  <div className="service__image">
                    <Image
                      priority
                      style={{ width: "auto", height: "auto" }}
                      src={Service12}
                      alt="Service Image"
                    />
                  </div>
                  <div className="service__image">
                    <Image
                      priority
                      style={{ width: "auto", height: "auto" }}
                      src={Service13}
                      alt="Service Image"
                    />
                  </div>
                  <div className="service__image">
                    <Image
                      priority
                      style={{ width: "auto", height: "auto" }}
                      src={Service14}
                      alt="Service Image"
                    />
                  </div>
                </div>

                <div className="right-content">
                  <div className="service__items-6">
                    <div
                      className="service__item-6 has__service_animation"
                      id="service_1"
                      data-secid="1"
                    >
                      <div className="image-tab">
                        <Image
                          priority
                          style={{ width: "auto", height: "auto" }}
                          src={Service11}
                          alt="Service Image"
                        />
                      </div>

                      <div className="animation__service_page">
                        <h2 className="service__title-6">
                          Mobile Development
                        </h2>
                        <p>
                          We create, products, brands, apps & websites for the companies all around the world class digital products. Our mobile development team specializes in creating high-performance, user-friendly applications that deliver exceptional experiences across all devices.
                        </p>
                        <ul>
                          <li>+ iOS App Development</li>
                          <li>+ Android App Development</li>
                          <li>+ Cross-Platform Solutions</li>
                          <li>+ UI/UX Design</li>
                          <li>+ App Store Optimization</li>
                          <li>+ Performance Optimization</li>
                        </ul>
                        <div className="btn_wrapper">
                          <Link
                            href="/service-details-dark"
                            className="wc-btn-secondary btn-item btn-hover"
                          >
                            <span></span>Get free
                            <br />
                            qoutes <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div
                      className="service__item-6"
                      id="service_2"
                      data-secid="2"
                    >
                      <div className="image-tab">
                        <Image
                          priority
                          style={{ width: "auto", height: "auto" }}
                          src={Service12}
                          alt="Service Image"
                        />
                      </div>

                      <div className="animation__service_page">
                        <h2 className="service__title-6">
                          Interaction Design
                        </h2>
                        <p>
                          We design smooth, interactive, and user-friendly experiences that make products simple, engaging, and enjoyable. Our interaction design team focuses on creating intuitive interfaces that guide users through seamless digital experiences.
                        </p>
                        <ul>
                          <li>+ User Experience Design</li>
                          <li>+ Interface Design</li>
                          <li>+ Prototyping</li>
                          <li>+ User Testing</li>
                          <li>+ Micro-Interactions</li>
                          <li>+ Design Systems</li>
                        </ul>
                        <div className="btn_wrapper">
                          <Link
                            href="/service-details-dark"
                            className="wc-btn-secondary btn-item btn-hover"
                          >
                            <span></span>Get free
                            <br />
                            qoutes <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div
                      className="service__item-6"
                      id="service_3"
                      data-secid="3"
                    >
                      <div className="image-tab">
                        <Image
                          priority
                          style={{ width: "auto", height: "auto" }}
                          src={Service13}
                          alt="Service Image"
                        />
                      </div>

                      <div className="animation__service_page">
                        <h2 className="service__title-6">
                          Digital Marketing
                        </h2>
                        <p>
                          We are helping companies connect with audiences and grow globally through world-class digital marketing. Our comprehensive digital marketing strategies drive engagement, increase brand visibility, and deliver measurable results across all digital channels.
                        </p>
                        <ul>
                          <li>+ Social Media Marketing</li>
                          <li>+ Search Engine Optimization</li>
                          <li>+ Content Marketing</li>
                          <li>+ Email Marketing</li>
                          <li>+ Paid Advertising</li>
                          <li>+ Analytics & Reporting</li>
                        </ul>
                        <div className="btn_wrapper">
                          <Link
                            href="/service-details-dark"
                            className="wc-btn-secondary btn-item btn-hover"
                          >
                            <span></span>Get free
                            <br />
                            qoutes <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div
                      className="service__item-6"
                      id="service_4"
                      data-secid="4"
                    >
                      <div className="image-tab">
                        <Image
                          priority
                          style={{ width: "auto", height: "auto" }}
                          src={Service14}
                          alt="Service Image"
                        />
                      </div>

                      <div className="animation__service_page">
                        <h2 className="service__title-6">
                          Website Development
                        </h2>
                        <p>
                          We craft high-performing websites, empowering businesses worldwide with a strong and seamless digital presence. Our web development team creates responsive, fast, and user-friendly websites that drive conversions and enhance your online presence.
                        </p>
                        <ul>
                          <li>+ Frontend Development</li>
                          <li>+ Backend Development</li>
                          <li>+ E-commerce Solutions</li>
                          <li>+ CMS Development</li>
                          <li>+ Performance Optimization</li>
                          <li>+ Security Implementation</li>
                        </ul>
                        <div className="btn_wrapper">
                          <Link
                            href="/service-details-dark"
                            className="wc-btn-secondary btn-item btn-hover"
                          >
                            <span></span>Get free
                            <br />
                            qoutes <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>

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

export default Service1;
