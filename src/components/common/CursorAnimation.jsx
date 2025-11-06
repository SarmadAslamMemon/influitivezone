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
            let tl = gsap.timeline({
              defaults: {
                x: e.clientX,
                y: e.clientY,
              },
              overwrite: "auto",
            });

            // Main Cursor Moving (Circle and Robot together)
            tl.to([".cursor1", ".lottie-cursor"], {
              ease: "none",
              duration: 0,
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