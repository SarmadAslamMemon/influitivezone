import { useEffect } from "react";
let gsap;

if (typeof window !== "undefined") {
  gsap = require("gsap").gsap;
}
import LottieCursor from "./LottieCursor";

const CursorAnimation = ({ cursor1, cursor2 }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let tHero = gsap.context(() => {
        function mousemoveHandler(e) {
          try {
            // Circle cursor - instant follow
            gsap.to(".cursor1", {
              x: e.clientX,
              y: e.clientY,
              ease: "none",
              duration: 0,
            });

            // Dot cursor - smooth trailing effect
            gsap.to(".lottie-cursor", {
              x: e.clientX,
              y: e.clientY,
              ease: "power2.out",
              duration: 0.3,
            });
          } catch (error) {
            console.log("Cursor animation error:", error);
          }
        }
        document.addEventListener("mousemove", mousemoveHandler);
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <div className="cursor1" ref={cursor1}></div>
      <LottieCursor cursorRef={cursor2} />
    </>
  );
};

export default CursorAnimation;