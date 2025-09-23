import Link from "next/link";
import Detail1 from "../../../public/assets/imgs/portfolio/graphic-design/1.jpg";
import Detail2 from "../../../public/assets/imgs/portfolio/graphic-design/2.jpg";
import Detail3 from "../../../public/assets/imgs/portfolio/graphic-design/3.jpg";
import Detail4 from "../../../public/assets/imgs/portfolio/graphic-design/4.jpg";
import Detail5 from "../../../public/assets/imgs/portfolio/graphic-design/5.jpg";
import Detail6 from "../../../public/assets/imgs/portfolio/graphic-design/6.jpg";
import Detail7 from "../../../public/assets/imgs/portfolio/graphic-design/7.jpg";
import DetailShape from "../../../public/assets/imgs/portfolio/graphic-design/shape.png";
import Image from "next/image";
import { useEffect, useRef } from "react";
import animationCharCome from "@/lib/utils/animationCharCome";

const PortfolioDetailsGraphic = () => {
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
                    Graphic <br />
                    Designing
                  </h2>
                </div>
              </div>

              {/* <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-5">
                <div className="portfolio__detail-info">
                  <ul>
                    <li>
                      Category <Link href="/category">Design</Link>
                    </li>
                    <li>
                      Client <span>Webflow</span>
                    </li>
                    <li>
                      Start Date <span>23 January 2021</span>
                    </li>
                    <li>
                      Handover <span>05 March 2021</span>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="portfolio__detail-thumb">
          <Image
            priority
            style={{ width: "auto", height: "auto" }}
            src={Detail1}
            alt="Graphic Design Portfolio"
            data-speed="auto"
          />
        </div>

        <div className="portfolio__detail-content">
          <div className="container g-0 line pt-140">
            <span className="line-3"></span>

            <div className="block-content">
              <div className="row">
                <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
                  <h2 className="portfolio__detail-title title-anim">
                    Creative visual identity and brand solutions
                  </h2>
                </div>

                <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
                  <div className="portfolio__detail-text">
                    <p>
                      At Influitive Zone, we craft visual identities that truly reflect who you are and what your brand stands for. Our graphic design approach blends creativity with strategy, ensuring every design not only looks amazing but also connects with your audience and inspires action. From a simple logo design to a complete brand system, we bring your ideas to life with clarity, creativity, and impact.
                    </p>

                    <ul>
                      <li>+ Brand Identity Design</li>
                      <li>+ Logo Design & Branding</li>
                      <li>+ Print Design & Layouts</li>
                      <li>+ Digital Graphics & Web Assets</li>
                      <li>+ Marketing Materials</li>
                      <li>+ Packaging Design</li>
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
                alt="Design Process"
                data-speed="0.5"
              />
            </div>

            <div className="block-content  pt-140">
              <div className="row">
                <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
                  <h2 className="portfolio__detail-title title-anim">
                    Visual and typography hierarchy
                  </h2>
                </div>

                <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
                  <div className="portfolio__detail-text">
                    <p>
                      At Influitive Zone, we use the principle of visual hierarchy to make designs that are both clear and impactful. By arranging elements in order of importance—like headings, icons, and menus—we help users quickly understand what matters most. Our strategic layouts guide attention naturally, making information easy to follow and encouraging users to take the right actions. With the right balance of size, contrast, and placement, we ensure your design not only looks good but also drives real results.
                    </p>

                    <div className="fonts">
                      <Image
                        priority
                        style={{ width: "253px", height: "auto" }}
                        src={DetailShape}
                        alt="Typography Hierarchy"
                      />
                      <ul>
                        <li className="regular">
                          <span>Regular</span> This is text message
                        </li>
                        <li className="medium">
                          <span>Medium</span> Medium typography
                        </li>
                        <li className="semibold">
                          <span>SemiBold</span> Just Amazing
                        </li>
                        <li className="blod">
                          <span>Bold</span> Awesome
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="block-gallery">
              <Image
                priority
                style={{ width: "50%", height: "auto" }}
                src={Detail3}
                alt="Brand Identity"
              />
              <Image
                priority
                style={{ width: "50%", height: "auto" }}
                src={Detail4}
                alt="Logo Design"
              />
            </div>

            <div className="block-thumb">
              <Image
                priority
                style={{ width: "auto", height: "auto" }}
                src={Detail5}
                alt="Design Showcase"
                data-speed="0.5"
              />
            </div>

            <div className="block-img-text">
              <Image
                priority
                width={375}
                style={{ height: "auto" }}
                src={Detail6}
                alt="Print Design"
              />
              <Image
                priority
                width={375}
                style={{ height: "auto" }}
                src={Detail7}
                alt="Digital Graphics"
              />
              <p>
                For those of us who are blessed with good sight. So we seldom
                consider it. That&apos;s why going off to investigate the whys and
                hows involved is a little like trying to get behind the wind{" "}
              </p>
            </div>

            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                <div className="portfolio__detail-btns pt-150 pb-150">
                  <Link
                    href="/portfolio-details-mobile-dark"
                    className="wc-btn-primary btn-hover"
                  >
                    <span></span> Prev Work
                  </Link>
                  <Link
                    href="/portfolio-details-marketing-dark"
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

export default PortfolioDetailsGraphic;