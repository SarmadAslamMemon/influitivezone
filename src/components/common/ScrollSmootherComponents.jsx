import { useEffect } from "react";
let gsap;

if (typeof window !== "undefined") {
  gsap = require("gsap").gsap;
}
let ScrollSmoother;

if (typeof window !== "undefined") {
  // Load ScrollSmoother dynamically
  try {
    ScrollSmoother = require("../../../public/assets/gsap-plugins/ScrollSmoother.min").default;
    gsap.registerPlugin(ScrollSmoother);
  } catch (error) {
    console.warn("ScrollSmoother not available:", error);
  }
}

const ScrollSmootherComponents = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && ScrollSmoother) {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        ScrollSmoother.create({
          smooth: 1,
          effects: device_width < 1025 ? false : true,
          smoothTouch: false,
          normalizeScroll: false,
          ignoreMobileResize: true,
        });
      });
      return () => tHero.revert();
    }
  }, []);
  return <div></div>;
};

export default ScrollSmootherComponents;
