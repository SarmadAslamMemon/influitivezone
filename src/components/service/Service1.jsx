import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Link from "next/link";
import Service11 from "../../../public/assets/imgs/service/1.png";
import Service12 from "../../../public/assets/imgs/service/2.png";
import Service13 from "../../../public/assets/imgs/service/3.png";
import Service14 from "../../../public/assets/imgs/service/4.png";
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
                        Interaction <br />
                        Design
                      </a>
                    </li>
                    <li>
                      <a href="#service_2" className={activeService === 2 ? 'active' : ''}>
                        Web & Mobile <br />
                        Development
                      </a>
                    </li>
                    <li>
                      <a href="#service_3" className={activeService === 3 ? 'active' : ''}>
                        Motion & Branding <br />
                        Design
                      </a>
                    </li>
                    <li>
                      <a href="#service_4" className={activeService === 4 ? 'active' : ''}>
                        Digital <br /> Maketing
                      </a>
                    </li>
                    <li>
                      <a href="#service_5" className={activeService === 5 ? 'active' : ''}>
                        Concept and <br />
                        Strategy
                      </a>
                    </li>
                    <li>
                      <a href="#service_6" className={activeService === 6 ? 'active' : ''}>
                        Illustrations & <br /> Prototype
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
                  <div className="service__image">
                    <Image
                      priority
                      style={{ width: "auto", height: "auto" }}
                      src={Service15}
                      alt="Service Image"
                    />
                  </div>
                  <div className="service__image">
                    <Image
                      priority
                      style={{ width: "auto", height: "auto" }}
                      src={Service16}
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
                          Optimized User Journeys & Functional Flow Models
                        </h2>
                        <p>
                          This stage of our interaction design process focuses on transforming research insights into meaningful user experiences. Building on the outcomes of the persona workshop, we design intuitive interaction flows and touchpoints that guide users seamlessly through digital products. Our goal is to craft clear, engaging, and functional pathways that make every interaction both efficient and enjoyable.
                        </p>
                        <ul>
                          <li>+ User Journey Mapping</li>
                          <li>+ Wireframing & Prototyping</li>
                          <li>+ Usability Testing</li>
                          <li>+ Information Architecture</li>
                          <li>+ Micro-Interactions & Animations</li>
                          <li>+ Responsive Interface Design</li>
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
                          User flows guiding users across web and mobile
                        </h2>
                        <p>
                          This phase of our UX methodology emphasizes crafting intuitive web and mobile experiences. Using insights from persona workshops, we design structured user journeys that allow each user to navigate seamlessly, accomplishing tasks efficiently on both web and mobile platforms.
                        </p>
                        <ul>
                          <li>+ UX Design</li>
                          <li>+ Web Development</li>
                          <li>+ Mobile Apps</li>
                          <li>+ User Journey</li>
                          <li>+ Interface Design</li>
                          <li>+ Responsive Design</li>
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
                          Paths and flows to boost engagement and brand identity
                        </h2>
                        <p>
                          In this stage, we integrate motion and branding elements to enhance user engagement. Based on persona insights, we develop dynamic interactions and cohesive brand experiences that guide users smoothly through their journey while reinforcing brand identity.
                        </p>
                        <ul>
                          <li>+ Motion Design</li>
                          <li>+ Branding Design</li>
                          <li>+ Dynamic Interactions</li>
                          <li>+ Cohesive Brand Experiences</li>
                          <li>+ Smooth User Journey</li>
                          <li>+ Reinforced Brand Identity</li>
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
                          User flows to drive conversions and optimize experience
                        </h2>
                        <p>
                          Leveraging persona insights, we map out user journeys that align with digital marketing strategies. This ensures every interaction is purposeful, guiding users toward conversion while providing an engaging and personalized online experience.
                        </p>
                        <ul>
                          <li>+ Digital Marketing</li>
                          <li>+ UX Strategy</li>
                          <li>+ User Journey Mapping</li>
                          <li>+ Conversion Optimization</li>
                          <li>+ Customer Experience</li>
                          <li>+ Engagement Design</li>
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
                      id="service_5"
                      data-secid="5"
                    >
                      <div className="image-tab">
                        <Image
                          priority
                          style={{ width: "auto", height: "auto" }}
                          src={Service15}
                          alt="Service Image"
                        />
                      </div>

                      <div className="animation__service_page">
                        <h2 className="service__title-6">
                          Paths and models aligning design with user and business goals
                        </h2>
                        <p>
                          This phase focuses on conceptualizing user-centric strategies. Drawing from persona research, we define clear pathways that align with business objectives, ensuring each interaction is meaningful and supports overall user goals.
                        </p>
                        <ul>
                          <li>+ UXStrategy</li>
                          <li>+ ConceptDesign</li>
                          <li>+ UserResearch</li>
                          <li>+ ExperienceMapping</li>
                          <li>+ DesignThinking</li>
                          <li>+ BusinessGoals</li>
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
                      id="service_6"
                      data-secid="6"
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
                          Flow models and paths to visualize interactions in prototypes
                        </h2>
                        <p>
                          We translate persona insights into visual prototypes and illustrative designs. This allows users to experience and interact with the product conceptually, ensuring clarity, functionality, and engagement before development.
                        </p>
                        <ul>
                          <li>+ Prototyping</li>
                          <li>+ UX Illustration</li>
                          <li>+ User Flow</li>
                          <li>+ Interactive Prototype</li>
                          <li>+ Visual Design</li>
                          <li>+ Experience Testing</li>
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
