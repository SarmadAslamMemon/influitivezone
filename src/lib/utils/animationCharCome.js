let gsap;

if (typeof window !== "undefined") {
  gsap = require("gsap").gsap;
}
let SplitText;

if (typeof window !== "undefined") {
  // Load SplitText dynamically
  try {
    SplitText = require("../../../public/assets/gsap-plugins/SplitText.min").default;
    gsap.registerPlugin(SplitText);
  } catch (error) {
    console.warn("SplitText not available:", error);
  }
}

const animationCharCome = (charAnim, staggerTime = 0.05) => {
  if (typeof window !== "undefined" && SplitText) {
    let tHero = gsap.context(() => {
      let char_come = charAnim;

      let split_char = new SplitText(char_come, { type: "chars, words" });
      gsap.from(split_char.chars, {
        duration: 1,
        x: 70,
        autoAlpha: 0,
        stagger: staggerTime,
      });
    });
    return () => tHero.revert();
  }
};

export default animationCharCome;
