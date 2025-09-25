import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "@/plugins";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link.js";
import ArrowDownBig from "../../../public/assets/imgs/icon/arrow-down-big.png";
import Image from "next/image.js";
import Head from "next/head";

const DigitalAgencyHero = () => {
  const heroTitle = useRef();
  const heroSubTitle = useRef();
  const vantaRef = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load Vanta.js scripts
      const loadVantaScripts = () => {
        return new Promise((resolve) => {
          if (window.THREE && window.VANTA) {
            resolve();
            return;
          }

          const threeScript = document.createElement('script');
          threeScript.src = '/three.r134.min.js';
          threeScript.onload = () => {
            const vantaScript = document.createElement('script');
            vantaScript.src = '/vanta.net.min.js';
            vantaScript.onload = () => resolve();
            document.head.appendChild(vantaScript);
          };
          document.head.appendChild(threeScript);
        });
      };

      // Initialize Vanta.js NET effect
      const initVanta = async () => {
        await loadVantaScripts();
        
        if (window.VANTA && vantaRef.current) {
          window.VANTA.NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x4a90e2,
            backgroundColor: 0x0a0a0a,
            points: 15.00,
            maxDistance: 30.00,
            spacing: 25.00
          });
        }
      };

      initVanta();

      let tHero = gsap.context(() => {
        gsap.set(".experience", {
          y: 50,
          opacity: 0,
        });
        let split_hero__title = new SplitText(heroTitle.current, {
          type: "chars",
        });
        let split_hero__subtitle = new SplitText(heroSubTitle.current, {
          type: "chars words",
        });

        gsap.from(split_hero__title.chars, {
          duration: 1,
          x: 70,
          autoAlpha: 0,
          stagger: 0.1,
        });
        gsap.from(
          split_hero__subtitle.words,
          { duration: 1, x: 50, autoAlpha: 0, stagger: 0.05 },
          "-=1"
        );

        gsap.to(
          ".experience",
          {
            y: 0,
            opacity: 1,
            duration: 2,
            ease: "power2.out",
          },
          "-=1.5"
        );
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <section className="hero__area">
        {/* Vanta.js NET background */}
        <div 
          ref={vantaRef} 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0
          }}
        />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row">
            <div className="col-xxl-12">
              <div className="hero__content animation__hero_one">
                <Link href="/service-dark">
                  Strategy, Design, Solution Development{" "}
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </Link>
                <div className="hero__title-wrapper">
                  <h1 className="hero__title" ref={heroTitle}>
                    Your Growth Is Our Success
                  </h1>
                  <p className="hero__sub-title" ref={heroSubTitle}>
                    Discover cutting-edge services designed to elevate your business across the USA, Canada, and Middle-East countries
                  </p>
                </div>
                <Image
                  priority
                  width={170}
                  style={{ height: "auto" }}
                  src={ArrowDownBig}
                  alt="Arrow Down Icon"
                />
                <div className="experience">
                  <h2 className="title">22+</h2>
                  <p>
                    Projects completed <br />
                    successfully
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default DigitalAgencyHero;
