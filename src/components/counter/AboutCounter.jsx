import { useEffect } from "react";

let gsap;
let Power1;
let ScrollTrigger;

if (typeof window !== "undefined") {
  gsap = require("gsap").gsap;
  Power1 = require("gsap").Power1;
  ScrollTrigger = require("gsap/ScrollTrigger").ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
}

const AboutCounter = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        gsap.set(".counter_animation .counter__anim", { y: -100, opacity: 0 });
        if (device_width < 1023) {
          const counterArray = gsap.utils.toArray(
            ".counter_animation .counter__anim"
          );
          counterArray.forEach((item, i) => {
            let counterTl = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: "top center+=200",
              },
            });
            counterTl.to(item, {
              y: 0,
              opacity: 1,
              ease: "bounce",
              duration: 1.5,
            });
          });
        } else {
          gsap.to(".counter_animation .counter__anim", {
            scrollTrigger: {
              trigger: ".counter_animation",
              start: "top center+=300",
            },
            y: 0,
            opacity: 1,
            ease: "bounce",
            duration: 1.5,
            stagger: {
              each: 0.3,
            },
          });
        }
        // Simple counter animation without scroll trigger
        const counterElements = gsap.utils.toArray(".counter__number");
        const counterValues = [200, 80, 4, 10];

        counterElements.forEach((element, index) => {
          // Set initial state
          element.textContent = "0+";
          
          // Animate after a delay
          setTimeout(() => {
            gsap.to(element, {
              textContent: counterValues[index] + "+",
              duration: 2,
              ease: Power1.easeOut,
              snap: { textContent: 1 },
              onComplete: function() {
                element.textContent = counterValues[index] + "+";
              }
            });
          }, 1000 + (index * 500));
        });
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <section className="counter__area about-counter">
        <div className="container g-0 line pb-140 pt-140">
          <span className="line-3"></span>

          <div className="row">
            <div className="col-xxl-12">
              <div className="counter__wrapper-2 counter_animation">
                <div className="counter__item-2 counter__anim">
                  <h2 className="counter__number count1">22+</h2>
                  <p>
                    Project <br />
                    completed
                  </p>
                  <span className="counter__border"></span>
                </div>
                <div className="counter__item-2 counter__anim">
                  <h2 className="counter__number count2">15+</h2>
                  <p>
                    Happy <br />
                    customers
                  </p>
                  <span className="counter__border"></span>
                </div>
                <div className="counter__item-2 counter__anim">
                  <h2 className="counter__number count3">4+</h2>
                  <p>
                    Years <br />
                    experiences
                  </p>
                  <span className="counter__border"></span>
                </div>
                <div className="counter__item-2 counter__anim">
                  <h2 className="counter__number count4">10+</h2>
                  <p>
                    Awards <br />
                    achievement
                  </p>
                  <span className="counter__border"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutCounter;
