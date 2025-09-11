import { useEffect } from "react";
import { gsap } from "gsap";
import LottieCursor from "./LottieCursor";

const CursorAnimation = ({ cursor1, cursor2 }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let tHero = gsap.context(() => {
        function mousemoveHandler(e) {
          try {
            let tl = gsap.timeline({
              defaults: {
                x: e.clientX,
                y: e.clientY,
              },
              overwrite: "auto",
            });

            // Main Cursor Moving (Circle)
            tl.to(".cursor1", {
              ease: "power1.out",
              duration: 0.6,
            }).to(
              ".lottie-cursor",
              {
                ease: "power1.out",
                duration: 0.4,
              },
              "-=0.15"
            );
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