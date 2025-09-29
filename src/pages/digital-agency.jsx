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
import AboutTestimonial from "@/components/testimonial/AboutTestimonial";

const DigitalAgency = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      playCursor();
    }
  }, []);
  
  function playCursor() {
    try {
      let client_cursor = document.getElementById("client_cursor");
      console.log("Client cursor found:", !!client_cursor);
      
      if (client_cursor) {
        // Position cursor on every mousemove
        document.addEventListener("mousemove", (e) => {
          client_cursor.style.left = e.clientX + 'px';
          client_cursor.style.top = e.clientY + 'px';
        });

        // Show cursor on both testimonial and portfolio items
        document.addEventListener("mouseover", (e) => {
          const target = e.target;
          if (target.closest(".testimonial__img")) {
            console.log("Hovering over testimonial image, showing Play cursor");
            client_cursor.textContent = 'Play';
            client_cursor.style.opacity = '1';
          } else if (target.closest(".portfolio__item")) {
            console.log("Hovering over portfolio item, showing Click to Discover cursor");
            client_cursor.textContent = 'Click to Discover';
            client_cursor.style.opacity = '1';
          } else {
            client_cursor.style.opacity = '0';
          }
        });

        // Hide cursor when leaving images
        document.addEventListener("mouseout", (e) => {
          const target = e.target;
          if (target.closest(".testimonial__img") || target.closest(".portfolio__item")) {
            console.log("Leaving image, hiding cursor");
            client_cursor.style.opacity = '0';
          }
        });
      }
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
        <div 
          id="client_cursor" 
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100px',
            height: '100px',
            backgroundColor: '#000',
            borderRadius: '50%',
             zIndex: 999,
            opacity: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '10px',
            fontWeight: 'bold',
            textAlign: 'center',
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        >
          Click to Discover
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
          {/* <DigitalAgencyTestimonial /> */}
          <AboutTestimonial />
          <DigitalAgencyBlog />
          <DigitalAgencyCTA />
        </RootLayout>
      </main>
    </div>
  );
};

export default DigitalAgency;
