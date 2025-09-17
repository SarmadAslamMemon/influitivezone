import Link from "next/link";
import Detail1 from "../../../public/assets/imgs/portfolio/marketing/1.jpg";
import Detail2 from "../../../public/assets/imgs/portfolio/marketing/2.jpg";
import Detail3 from "../../../public/assets/imgs/portfolio/marketing/3.jpg";
import Detail4 from "../../../public/assets/imgs/portfolio/marketing/4.jpg";
import Detail5 from "../../../public/assets/imgs/portfolio/marketing/5.jpg";
import Detail6 from "../../../public/assets/imgs/portfolio/marketing/6.jpg";
import Detail7 from "../../../public/assets/imgs/portfolio/marketing/7.jpg";
import DetailShape from "../../../public/assets/imgs/portfolio/marketing/shape.png";
import Image from "next/image";
import { useEffect, useRef } from "react";
import animationCharCome from "@/lib/utils/animationCharCome";

const PortfolioDetailsMarketing = () => {
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
                    Digital <br />
                    Marketing
                  </h2>
                </div>
              </div>

              <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-5">
                <div className="portfolio__detail-info">
                  <ul>
                    <li>
                      Category <Link href="/category">Marketing</Link>
                    </li>
                    <li>
                      Client <span>BrandCorp</span>
                    </li>
                    <li>
                      Start Date <span>01 March 2023</span>
                    </li>
                    <li>
                      Handover <span>25 June 2023</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="portfolio__detail-thumb">
          <Image
            priority
            style={{ width: "auto", height: "auto" }}
            src={Detail1}
            alt="Digital Marketing Portfolio"
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
                    Strategic digital marketing campaigns that drive results
                  </h2>
                </div>

                <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
                  <div className="portfolio__detail-text">
                    <p>
                      At Influitive Zone, we help businesses grow with smart and creative digital marketing strategies that actually deliver results. Our team combines data-driven insights with engaging content to make sure your brand not only reaches the right audience but also leaves a lasting impact. From boosting visibility on search engines to running impactful social media and ad campaigns, we tailor every strategy to your goals and target market.
                    </p>

                    <ul>
                      <li>+ Search Engine Optimization (SEO)</li>
                      <li>+ Social Media Marketing</li>
                      <li>+ Google Ads & PPC Campaigns</li>
                      <li>+ Content Marketing Strategy</li>
                      <li>+ Email Marketing Automation</li>
                      <li>+ Analytics & Performance Tracking</li>
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
                alt="Marketing Strategy"
                data-speed="0.5"
              />
            </div>

            <div className="block-content  pt-140">
              <div className="row">
                <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
                  <h2 className="portfolio__detail-title title-anim">
                    Multi-channel approach and campaign analytics
                  </h2>
                </div>

                <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
                  <div className="portfolio__detail-text">
                    <p>
                      At Influitive Zone, we take a complete approach to digital marketing by bringing together multiple channels into one seamless strategy. Whether it’s search, social, or paid campaigns, we make sure your brand connects with your audience wherever they are. Using advanced analytics and A/B testing, we constantly fine-tune campaigns to improve performance and ensure you get the best return on your marketing investment.
                    </p>

                    <div className="fonts">
                      <Image
                        priority
                        style={{ width: "253px", height: "auto" }}
                        src={DetailShape}
                        alt="Marketing Metrics"
                      />
                      <ul>
                        <li className="regular">
                          <span>Strategy</span> Research & Planning
                        </li>
                        <li className="medium">
                          <span>Content</span> Creation & Optimization
                        </li>
                        <li className="semibold">
                          <span>Campaigns</span> Multi-Channel Execution
                        </li>
                        <li className="blod">
                          <span>Analytics</span> Performance Tracking
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
                alt="SEO Strategy"
              />
              <Image
                priority
                style={{ width: "50%", height: "auto" }}
                src={Detail4}
                alt="Social Media Campaign"
              />
            </div>

            <div className="block-thumb">
              <Image
                priority
                style={{ width: "auto", height: "auto" }}
                src={Detail5}
                alt="Marketing Dashboard"
                data-speed="0.5"
              />
            </div>

            <div className="block-img-text">
              <Image
                priority
                width={375}
                style={{ height: "auto" }}
                src={Detail6}
                alt="Campaign Results"
              />
              <Image
                priority
                width={375}
                style={{ height: "auto" }}
                src={Detail7}
                alt="Analytics Dashboard"
              />
              <p>
                Transforming data into actionable insights that drive business growth. Every campaign tells a story of success through strategic planning and precise execution.
              </p>
            </div>

            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                <div className="portfolio__detail-btns pt-150 pb-150">
                  <Link
                    href="/portfolio-details-graphic-dark"
                    className="wc-btn-primary btn-hover"
                  >
                    <span></span> Prev Work
                  </Link>
                  <Link
                    href="/portfolio-details-website-dark"
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

export default PortfolioDetailsMarketing;