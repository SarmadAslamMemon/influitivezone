import Head from "next/head";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import RootLayout from "@/components/common/layout/RootLayout";
import DigitalAgencyHero from "@/components/hero/DigitalAgencyHero";
import DigitalAgencyRoll from "@/components/roll/DigitalAgencyRoll";
import PricingCards from "@/components/pricing/PricingCards";
import DigitalAgencyAbout from "@/components/about/DigitalAgencyAbout";
import DigitalAgencyService from "@/components/service/DigitalAgencyService";
import DigitalAgencyCounter from "@/components/counter/DigitalAgencyCounter";
import DigitalAgencyWorkflow from "@/components/workflow/DigitalAgencyWorkflow";
import DigitalAgencyPortfolio from "@/components/portfolio/DigitalAgencyPortfolio";
import DigitalAgencyBrand from "@/components/brand/DigitalAgencyBrand";
import DigitalAgencyTestimonial from "@/components/testimonial/DigitalAgencyTestimonial";
import DigitalAgencyBlog from "@/components/blog/DigitalAgencyBlog";
import DigitalAgencyCTA from "@/components/cta/DigitalAgencyCTA";

const DigitalAgency = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      playCursor();
    }
  }, []);
  
  function playCursor() {
    try {
      let client_cursor = document.getElementById("client_cursor");
      document.addEventListener("mousemove", (e) => {
        const target = e.target;
        let tHero = gsap.context(() => {
          let tl = gsap.timeline({
            defaults: {
              x: e.clientX,
              y: e.clientY,
            },
          });
          let t2 = gsap.timeline({
            defaults: {
              x: e.clientX,
              y: e.clientY,
            },
          });

          // Home Page Client Cursor
          if (target.closest(".testimonial__img")) {
            tl.to(
              client_cursor,
              {
                opacity: 1,
                ease: "power4.out",
              },
              "-=0.3"
            );
          } else {
            t2.to(
              client_cursor,
              {
                opacity: 0,
                ease: "power4.out",
              },
              "-=0.3"
            );
          }
        });
        return () => tHero.revert();
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div>
      <Head>
        <title>Digital Agency</title>
        <meta name="description" content="Digital Agency Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div className="cursor" id="client_cursor">
          Play
        </div>
        <RootLayout defaultMode="dark">
          <DigitalAgencyHero />
          <DigitalAgencyRoll />
          <PricingCards />
          <DigitalAgencyAbout />
          <DigitalAgencyService />
          <DigitalAgencyCounter />
          <DigitalAgencyWorkflow />
          <DigitalAgencyPortfolio />
          {/* <DigitalAgencyBrand /> */}
          <DigitalAgencyTestimonial />
          <DigitalAgencyBlog />
          <DigitalAgencyCTA />
        </RootLayout>
      </main>
    </div>
  );
};

export default DigitalAgency;
