import { useEffect, useRef, useState } from "react";
import Link from "next/link";

let gsap;
let ScrollTrigger;

if (typeof window !== "undefined") {
  gsap = require("gsap").gsap;
  ScrollTrigger = require("gsap/ScrollTrigger").ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
}

const PricingCards = () => {
  const [activeRegion, setActiveRegion] = useState("USA");
  const pricingRef = useRef();
  const cardsRef = useRef([]);

  const regions = [
    { id: "USA", name: "United States", flag: "US", currency: "$" },
    { id: "UAE", name: "United Arab Emirates", flag: "UAE", currency: "AED" },
    { id: "UK", name: "United Kingdom", flag: "UK", currency: "£" }
  ];

  const pricingPlans = {
    USA: [
      {
        name: "Silver",
        price: 299,
        description: "Perfect for small businesses and startups",
        features: [
          { name: "Basic Website With 5 pages static", included: true },
          { name: "Unlimited stock photos", included: true },
          { name: "Free content", included: true },
          { name: "Social media accounts setup", included: true },
          { name: "Website live setup", included: true },
          { name: "Free 5 posts design according to desired design", included: true },
        ]
      },
      {
        name: "Gold",
        price: 499,
        description: "Ideal for growing businesses and teams",
        features: [
          { name: "Unlimited stock photos", included: true },
          { name: "Free content", included: true },
          { name: "Social media accounts setup", included: true },
          { name: "Website live setup", included: true },          
          { name: "Basic Website With 8 pages", included: true },
          { name: "Free 7 posts design according to desired design", included: true },
          { name: "Hosting", included: true },
          { name: "Three months maintenance", included: true },
        ],
        featured: true
      },
      {
        name: "Platinum",
        price: 799,
        description: "For large organizations and enterprises",
        features: [
          { name: "Unlimited stock photos", included: true },
          { name: "Free content", included: true },
          { name: "Social media accounts setup", included: true },
          { name: "Website live setup", included: true },
          { name: "Hosting", included: true },
          { name: "Free customized Logo", included: true },
          { name: "Fully customized Website With upto 13 pages", included: true },
          { name: "Free 10 posts design according to desired design", included: true },
          { name: "Five months maintenance", included: true }
        ]
      }
    ],
    UAE: [
      {
        name: "Silver",
        price: 1095,
        description: "Perfect for small businesses and startups",
        features: [
          { name: "Basic Website With 5 pages static", included: true },
          { name: "Unlimited stock photos", included: true },
          { name: "Free content", included: true },
          { name: "Social media accounts setup", included: true },
          { name: "Website live setup", included: true },
          { name: "Free 5 posts design according to desired design", included: true },
        ]
      },
      {
        name: "Gold",
        price: 1825,
        description: "Ideal for growing businesses and teams",
        features: [
          { name: "Unlimited stock photos", included: true },
          { name: "Free content", included: true },
          { name: "Social media accounts setup", included: true },
          { name: "Website live setup", included: true },
          { name: "Basic Website With 8 pages", included: true },
          { name: "Free 7 posts design according to desired design", included: true },
          { name: "Hosting", included: true },
          { name: "Three months maintenance", included: true },
        ],
        featured: true
      },
      {
        name: "Platinum",
        price: 2920,
        description: "For large organizations and enterprises",
        features: [
          { name: "Unlimited stock photos", included: true },
          { name: "Free content", included: true },
          { name: "Social media accounts setup", included: true },
          { name: "Website live setup", included: true },
          { name: "Hosting", included: true },
          { name: "Free customized Logo", included: true },
          { name: "Fully customized Website With upto 13 pages", included: true },
          { name: "Free 10 posts design according to desired design", included: true },
          { name: "Five months maintenance", included: true }
        ]
      }
    ],
    UK: [
      {
        name: "Silver",
        price: 220,
        description: "Perfect for small businesses and startups",
        features: [
          { name: "Basic Website With 5 pages static", included: true },
          { name: "Unlimited stock photos", included: true },
          { name: "Free content", included: true },
          { name: "Social media accounts setup", included: true },
          { name: "Website live setup", included: true },
          { name: "Free 5 posts design according to desired design", included: true },
        ]
      },
      {
        name: "Gold",
        price: 370,
        description: "Ideal for growing businesses and teams",
        features: [
          { name: "Unlimited stock photos", included: true },
          { name: "Free content", included: true },
          { name: "Social media accounts setup", included: true },
          { name: "Website live setup", included: true },
          { name: "Basic Website With 8 pages", included: true },
          { name: "Free 7 posts design according to desired design", included: true },
          { name: "Hosting", included: true },
          { name: "Three months maintenance", included: true },
        ],
        featured: true
      },
      {
        name: "Platinum",
        price: 590,
        description: "For large organizations and enterprises",
        features: [
          { name: "Unlimited stock photos", included: true },
          { name: "Free content", included: true },
          { name: "Social media accounts setup", included: true },
          { name: "Website live setup", included: true },
          { name: "Hosting", included: true },
          { name: "Free customized Logo", included: true },
          { name: "Fully customized Website With upto 13 pages", included: true },
          { name: "Free 10 posts design according to desired design", included: true },
          { name: "Five months maintenance", included: true }
        ]
      }
    ]
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cards = cardsRef.current;
      
      // Animate cards on scroll
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Hover animations
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }
  }, [activeRegion]);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const handleRegionChange = (regionId) => {
    setActiveRegion(regionId);
    // Reset refs for new cards
    cardsRef.current = [];
  };

  const currentRegion = regions.find(r => r.id === activeRegion);
  const currentPricing = pricingPlans[activeRegion];

  return (
    <section className="pricing__area" ref={pricingRef}>
      <div className="container g-0">
        <div className="row">
          <div className="col-xxl-12">
            <div className="sec-title-wrapper text-anim">
              <h4 className="sec-sub-title">Pricing Plans</h4>
              <h5 className="sec-title title-anim">
                Choose Your <br />
                Perfect Plan
              </h5>
              <p>
                Select your region to view pricing in your local currency with 
                region-specific features and support.
              </p>
            </div>
          </div>
        </div>

        {/* Region Toggle */}
        <div className="row">
          <div className="col-xxl-12">
            <div className="pricing__toggle-wrapper">
              {regions.map((region) => (
                <button
                  key={region.id}
                  className={`pricing__toggle-btn ${activeRegion === region.id ? 'active' : ''}`}
                  onClick={() => handleRegionChange(region.id)}
                >
                  <span className="toggle-flag">{region.flag}</span>
                  <span className="toggle-name">{region.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Region Header */}
        <div className="row">
          <div className="col-xxl-12">
            <div className="pricing__region-header text-center">
              <h3>{currentRegion.name} ({currentRegion.currency})</h3>
            </div>
          </div>
        </div>
        
        {/* Pricing Plans */}
        <div className="row g-4 align-items-stretch">
          {currentPricing.map((plan, index) => (
            <div key={plan.name} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <div 
                className={`pricing__plan ${plan.featured ? 'pricing__plan-featured' : ''}`}
                ref={addToRefs}
              >
                {plan.featured && (
                  <div className="featured-badge">Most Popular</div>
                )}
                <div className="pricing__plan-header">
                  <h3>{plan.name}</h3>
                  <div className="pricing__plan-price">
                    <span className="currency">{currentRegion.currency}</span>
                    <span className="amount">{plan.price}</span>
                    <span className="period">/month</span>
                  </div>
                  <p>{plan.description}</p>
                </div>
                <div className="pricing__plan-features">
                  <ul>
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={feature.included ? 'included' : 'not-included'}>
                        <span>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pricing__plan-cta">
                  <Link href="/contact">
                    <button className="pricing__plan-btn">
                      Contact Sales
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingCards;
