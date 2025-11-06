let gsap;
let SplitText;

if (typeof window !== "undefined") {
  gsap = require("gsap").gsap;
  // Load SplitText dynamically
  try {
    SplitText = require("../../../public/assets/gsap-plugins/SplitText.min").default;
    gsap.registerPlugin(SplitText);
  } catch (error) {
    console.warn("SplitText not available:", error);
  }
}

const animationWordCome = (wordAnim, staggerTime = 0.05) => {
  if (typeof window !== "undefined" && wordAnim && SplitText) {
    try {
      let tHero = gsap.context(() => {
        let word_come = wordAnim;
        if (word_come && word_come.nodeType === 1) { // Check if it's a valid DOM element
          let split_word_come = new SplitText(word_come, {
            type: "chars words",
            position: "absolute",
          });
          gsap.from(split_word_come.words, {
            duration: 1,
            x: 50,
            autoAlpha: 0,
            stagger: staggerTime,
          });
        }
      });
      return () => tHero.revert();
    } catch (error) {
      console.warn("Animation error:", error);
      return () => {};
    }
  }
};

export default animationWordCome;
