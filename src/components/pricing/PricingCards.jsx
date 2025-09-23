import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
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
        name: "Starter",
        price: 299,
        description: "Perfect for small businesses and startups",
        features: [
          { name: "5 Projects", included: true },
          { name: "Basic Analytics", included: true },
          { name: "Email Support", included: true },
          { name: "10GB Storage", included: true },
          { name: "Mobile App", included: true },
          { name: "25 Projects", included: false },
          { name: "Advanced Analytics", included: false },
          { name: "Priority Support", included: false },
          { name: "100GB Storage", included: false },
          { name: "API Access", included: false },
          { name: "Custom Integrations", included: false },
          { name: "Unlimited Projects", included: false },
          { name: "Enterprise Analytics", included: false },
          { name: "24/7 Phone Support", included: false },
          { name: "1TB Storage", included: false },
          { name: "Dedicated Manager", included: false },
          { name: "SLA Guarantee", included: false }
        ]
      },
      {
        name: "Professional",
        price: 499,
        description: "Ideal for growing businesses and teams",
        features: [
          { name: "5 Projects", included: false },
          { name: "Basic Analytics", included: false },
          { name: "Email Support", included: false },
          { name: "10GB Storage", included: false },
          { name: "Mobile App", included: true },
          { name: "25 Projects", included: true },
          { name: "Advanced Analytics", included: true },
          { name: "Priority Support", included: true },
          { name: "100GB Storage", included: true },
          { name: "API Access", included: true },
          { name: "Custom Integrations", included: true },
          { name: "Unlimited Projects", included: false },
          { name: "Enterprise Analytics", included: false },
          { name: "24/7 Phone Support", included: false },
          { name: "1TB Storage", included: false },
          { name: "Dedicated Manager", included: false },
          { name: "SLA Guarantee", included: false }
        ],
        featured: true
      },
      {
        name: "Enterprise",
        price: 799,
        description: "For large organizations and enterprises",
        features: [
          { name: "5 Projects", included: false },
          { name: "Basic Analytics", included: false },
          { name: "Email Support", included: false },
          { name: "10GB Storage", included: false },
          { name: "Mobile App", included: true },
          { name: "25 Projects", included: false },
          { name: "Advanced Analytics", included: false },
          { name: "Priority Support", included: false },
          { name: "100GB Storage", included: false },
          { name: "API Access", included: true },
          { name: "Custom Integrations", included: true },
          { name: "Unlimited Projects", included: true },
          { name: "Enterprise Analytics", included: true },
          { name: "24/7 Phone Support", included: true },
          { name: "1TB Storage", included: true },
          { name: "Dedicated Manager", included: true },
          { name: "SLA Guarantee", included: true }
        ]
      }
    ],
    UAE: [
      {
        name: "Starter",
        price: 1095,
        description: "Perfect for small businesses and startups",
        features: [
          { name: "5 Projects", included: true },
          { name: "Basic Analytics", included: true },
          { name: "Email Support", included: true },
          { name: "10GB Storage", included: true },
          { name: "Mobile App", included: true },
          { name: "25 Projects", included: false },
          { name: "Advanced Analytics", included: false },
          { name: "Priority Support", included: false },
          { name: "100GB Storage", included: false },
          { name: "API Access", included: false },
          { name: "Custom Integrations", included: false },
          { name: "Unlimited Projects", included: false },
          { name: "Enterprise Analytics", included: false },
          { name: "24/7 Phone Support", included: false },
          { name: "1TB Storage", included: false },
          { name: "Dedicated Manager", included: false },
          { name: "SLA Guarantee", included: false }
        ]
      },
      {
        name: "Professional",
        price: 1825,
        description: "Ideal for growing businesses and teams",
        features: [
          { name: "5 Projects", included: false },
          { name: "Basic Analytics", included: false },
          { name: "Email Support", included: false },
          { name: "10GB Storage", included: false },
          { name: "Mobile App", included: true },
          { name: "25 Projects", included: true },
          { name: "Advanced Analytics", included: true },
          { name: "Priority Support", included: true },
          { name: "100GB Storage", included: true },
          { name: "API Access", included: true },
          { name: "Custom Integrations", included: true },
          { name: "Unlimited Projects", included: false },
          { name: "Enterprise Analytics", included: false },
          { name: "24/7 Phone Support", included: false },
          { name: "1TB Storage", included: false },
          { name: "Dedicated Manager", included: false },
          { name: "SLA Guarantee", included: false }
        ],
        featured: true
      },
      {
        name: "Enterprise",
        price: 2920,
        description: "For large organizations and enterprises",
        features: [
          { name: "5 Projects", included: false },
          { name: "Basic Analytics", included: false },
          { name: "Email Support", included: false },
          { name: "10GB Storage", included: false },
          { name: "Mobile App", included: true },
          { name: "25 Projects", included: false },
          { name: "Advanced Analytics", included: false },
          { name: "Priority Support", included: false },
          { name: "100GB Storage", included: false },
          { name: "API Access", included: true },
          { name: "Custom Integrations", included: true },
          { name: "Unlimited Projects", included: true },
          { name: "Enterprise Analytics", included: true },
          { name: "24/7 Phone Support", included: true },
          { name: "1TB Storage", included: true },
          { name: "Dedicated Manager", included: true },
          { name: "SLA Guarantee", included: true }
        ]
      }
    ],
    UK: [
      {
        name: "Starter",
        price: 220,
        description: "Perfect for small businesses and startups",
        features: [
          { name: "5 Projects", included: true },
          { name: "Basic Analytics", included: true },
          { name: "Email Support", included: true },
          { name: "10GB Storage", included: true },
          { name: "Mobile App", included: true },
          { name: "25 Projects", included: false },
          { name: "Advanced Analytics", included: false },
          { name: "Priority Support", included: false },
          { name: "100GB Storage", included: false },
          { name: "API Access", included: false },
          { name: "Custom Integrations", included: false },
          { name: "Unlimited Projects", included: false },
          { name: "Enterprise Analytics", included: false },
          { name: "24/7 Phone Support", included: false },
          { name: "1TB Storage", included: false },
          { name: "Dedicated Manager", included: false },
          { name: "SLA Guarantee", included: false }
        ]
      },
      {
        name: "Professional",
        price: 370,
        description: "Ideal for growing businesses and teams",
        features: [
          { name: "5 Projects", included: false },
          { name: "Basic Analytics", included: false },
          { name: "Email Support", included: false },
          { name: "10GB Storage", included: false },
          { name: "Mobile App", included: true },
          { name: "25 Projects", included: true },
          { name: "Advanced Analytics", included: true },
          { name: "Priority Support", included: true },
          { name: "100GB Storage", included: true },
          { name: "API Access", included: true },
          { name: "Custom Integrations", included: true },
          { name: "Unlimited Projects", included: false },
          { name: "Enterprise Analytics", included: false },
          { name: "24/7 Phone Support", included: false },
          { name: "1TB Storage", included: false },
          { name: "Dedicated Manager", included: false },
          { name: "SLA Guarantee", included: false }
        ],
        featured: true
      },
      {
        name: "Enterprise",
        price: 590,
        description: "For large organizations and enterprises",
        features: [
          { name: "5 Projects", included: false },
          { name: "Basic Analytics", included: false },
          { name: "Email Support", included: false },
          { name: "10GB Storage", included: false },
          { name: "Mobile App", included: true },
          { name: "25 Projects", included: false },
          { name: "Advanced Analytics", included: false },
          { name: "Priority Support", included: false },
          { name: "100GB Storage", included: false },
          { name: "API Access", included: true },
          { name: "Custom Integrations", included: true },
          { name: "Unlimited Projects", included: true },
          { name: "Enterprise Analytics", included: true },
          { name: "24/7 Phone Support", included: true },
          { name: "1TB Storage", included: true },
          { name: "Dedicated Manager", included: true },
          { name: "SLA Guarantee", included: true }
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
        <div className="row">
          {currentPricing.map((plan, index) => (
            <div key={plan.name} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
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
                        {feature.included ? '✓' : '✗'} {feature.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pricing__plan-cta">
                  <Link href="/contact-dark">
                    <button className="pricing__plan-btn">
                      {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
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
