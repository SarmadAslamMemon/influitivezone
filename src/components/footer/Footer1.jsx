import { useEffect, useRef } from "react";
let gsap;
let ScrollTrigger;
let SplitText;
let chroma;

if (typeof window !== "undefined") {
  gsap = require("gsap").gsap;
  ScrollTrigger = require("gsap/ScrollTrigger").ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
  
  // Load premium plugins dynamically
  try {
    SplitText = require("../../../public/assets/gsap-plugins/SplitText.min").default;
    if (SplitText) {
      gsap.registerPlugin(SplitText);
    }
  } catch (error) {
    console.warn("SplitText not available:", error);
    SplitText = null;
  }
  
  try {
    chroma = require("../../../public/assets/gsap-plugins/chroma.min").default;
    if (chroma) {
      gsap.registerPlugin(chroma);
    }
  } catch (error) {
    console.warn("chroma not available:", error);
    chroma = null;
  }
}
import Link from "next/link.js";
import SiteLogoWhite from "../../../public/assets/imgs/logo/site-logo-white-2.png";
import Image from "next/image.js";

export default function Footer1() {
  const menuAnim = useRef();
  useEffect(() => {
    if (menuAnim.current) {
      menuAnimation();
    }
  }, []);
  const menuAnimation = () => {
    let rootParent = menuAnim.current.children;
    for (let i = 0; i < rootParent.length; i++) {
      let firstParent = rootParent[i].children;
      let arr = firstParent[0].textContent.split("")
      let spanData = ''
      for (let j = 0; j < arr.length; j++) {
        if(arr[j] == ' ') {
          spanData += `<span style='width:6px;'>${arr[j]}</span>`;
        } else {
          spanData += `<span>${arr[j]}</span>`;
        }
      }
      let result = '<div class="menu-text">' + spanData + '</div>';
      firstParent[0].innerHTML = result
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Wait for DOM to be ready
      const initAnimation = () => {
        const endElement = document.querySelector(".end");
        if (!endElement) return;

        let tHero = gsap.context(() => {
          // Set initial state
          gsap.set(".end", {
            opacity: 0,
          });

          // Fade in animation
          gsap.to(".end", {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".end",
              start: "bottom 100%-=50px",
              once: true,
            },
          });

          // Check if SplitText is available
          if (SplitText) {
            try {
              let mySplitText = new SplitText(".end", { type: "words,chars" });
              let chars = mySplitText.chars;
              
              // Create a simple gradient effect without chroma
              let colors = ["#000B25", "#1a2a4a", "#2d3f5c", "#000B25"];
              
              // Create timeline for character animation
              let endTl = gsap.timeline({
                repeat: -1,
                delay: 0.5,
                scrollTrigger: {
                  trigger: ".end",
                  start: "bottom 100%-=50px",
                },
              });

              // Set initial white color
              gsap.set(chars, { color: "#ffffff" });

              endTl.to(chars, {
                duration: 0.5,
                scaleY: 0.6,
                ease: "power3.out",
                stagger: 0.04,
                transformOrigin: "center bottom",
              });
              
              endTl.to(chars, {
                yPercent: -20,
                ease: "elastic",
                stagger: 0.03,
                duration: 0.8,
              }, 0.5);
              
              endTl.to(chars, {
                scaleY: 1,
                ease: "elastic.out(2.5, 0.2)",
                stagger: 0.03,
                duration: 1.5,
              }, 0.5);
              
              endTl.to(chars, {
                color: (i, el, arr) => {
                  const colorIndex = Math.floor((i / arr.length) * colors.length);
                  return colors[colorIndex];
                },
                ease: "power2.out",
                stagger: 0.03,
                duration: 0.3,
              }, 0.5);
              
              endTl.to(chars, {
                yPercent: 0,
                ease: "back",
                stagger: 0.03,
                duration: 0.8,
              }, 0.7);
              
              endTl.to(chars, {
                color: "#ffffff",
                duration: 1.4,
                stagger: 0.05,
              });
              
              // Ensure it stays white at the end
              endTl.set(chars, { color: "#ffffff" });
            } catch (error) {
              console.warn("SplitText animation failed:", error);
              // Fallback: simple hover animation
              gsap.to(".end", {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: ".end",
                  start: "bottom 100%-=50px",
                  onEnter: () => {
                    gsap.to(".end", {
                      scale: 1,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }
                }
              });
            }
          } else {
            // Fallback animation without SplitText
            gsap.to(".end", {
              scale: 1.1,
              duration: 0.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".end",
                start: "bottom 100%-=50px",
                onEnter: () => {
                  gsap.to(".end", {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }
              }
            });
          }
        });
        return () => tHero.revert();
      };

      // Initialize animation after a short delay to ensure DOM is ready
      const timer = setTimeout(initAnimation, 100);
      return () => clearTimeout(timer);
    }
  }, []);
  return (
    <>
      <footer className="footer__area-3">
        <div className="footer__top-3">
          <div className="footer__top-wrapper-3">
            <div className="footer__logo-3 pt-120">
              <Image
                priority
                width={200}
                height={66}
                quality={100}
                style={{ 
                  width: "auto", 
                  height: "auto",
                  maxWidth: "200px",
                  maxHeight: "66px",
                  objectFit: "contain"
                }}
                src={SiteLogoWhite}
                alt="Footer Logo"
              />
              <p>
                Discover cutting-edge services designed to elevate your business across the USA, Canada, and Middle-East countries.
              </p>
            </div>
            <div className="footer__social-3">
              <ul>
                <li>
                  <a href="https://web.facebook.com/Influitivezone/">facebook</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/influitive-zone/">Linkedin</a>
                </li>
                <li>
                  <a href="https://www.instagram.com/influitivezone/">Instagram</a>
                </li>
              </ul>
            </div>
            <div className="footer__page-links-3">
              <ul>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/service">Services</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </div>
            <div className="footer__contact-3">
              <Link className="end" href="/contact">
                Let’s talk
              </Link>
            </div>
          </div>
        </div>

        <div className="footer__btm-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xxl-4 col-xl-4 col-lg-4">
                <div className="footer__copyright-3">
                  <p>
                    ©{new Date().getFullYear()} | All Rights Reserved{" "}
                    <a href="#" target="_blank">
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-xxl-8 col-xl-8 col-lg-8">
                <div className="footer__nav-2">
                  <ul className="footer-menu-2 menu-anim" ref={menuAnim}>
                    <li>
                      <Link href="/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link href="/terms-of-service">Terms of Service</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
