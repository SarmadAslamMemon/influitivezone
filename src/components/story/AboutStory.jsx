import Story1 from "../../../public/assets/imgs/story/1.jpg";
import Story2 from "../../../public/assets/imgs/story/2.jpg";
import Story3 from "../../../public/assets/imgs/story/3.jpg";
import Story4 from "../../../public/assets/imgs/story/4.jpg";
import Image from "next/image";

const AboutStory = () => {
  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes slide {
          0% { transform: translateX(-20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(20px); opacity: 0; }
        }
      `}</style>
      <section className="story__area" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Tech Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(137, 195, 229, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(58, 99, 145, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(3, 7, 17, 0.3) 0%, transparent 50%)
          `,
          zIndex: 1
        }}>
          {/* Floating Tech Dots */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '4px',
            height: '4px',
            background: 'rgba(137, 195, 229, 0.6)',
            borderRadius: '50%',
            animation: 'float 3s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '15%',
            width: '6px',
            height: '6px',
            background: 'rgba(58, 99, 145, 0.4)',
            borderRadius: '50%',
            animation: 'float 4s ease-in-out infinite reverse'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '30%',
            left: '8%',
            width: '3px',
            height: '3px',
            background: 'rgba(137, 195, 229, 0.8)',
            borderRadius: '50%',
            animation: 'float 2.5s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '40%',
            left: '12%',
            width: '5px',
            height: '5px',
            background: 'rgba(58, 99, 145, 0.5)',
            borderRadius: '50%',
            animation: 'float 3.5s ease-in-out infinite reverse'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '6%',
            width: '4px',
            height: '4px',
            background: 'rgba(137, 195, 229, 0.7)',
            borderRadius: '50%',
            animation: 'float 2.8s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '60%',
            left: '10%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.6)',
            borderRadius: '50%',
            animation: 'float 3.2s ease-in-out infinite reverse'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '70%',
            left: '7%',
            width: '5px',
            height: '5px',
            background: 'rgba(137, 195, 229, 0.5)',
            borderRadius: '50%',
            animation: 'float 2.2s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '80%',
            left: '14%',
            width: '4px',
            height: '4px',
            background: 'rgba(58, 99, 145, 0.7)',
            borderRadius: '50%',
            animation: 'float 3.8s ease-in-out infinite reverse'
          }}></div>
          
          {/* Tech Grid Pattern */}
          <div style={{
            position: 'absolute',
            top: '15%',
            left: '25%',
            width: '100px',
            height: '100px',
            background: `
              linear-gradient(90deg, rgba(137, 195, 229, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(137, 195, 229, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            opacity: 0.3,
            animation: 'pulse 4s ease-in-out infinite'
          }}></div>
          
          {/* Circuit-like Lines */}
          <div style={{
            position: 'absolute',
            top: '25%',
            left: '30%',
            width: '60px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(137, 195, 229, 0.4), transparent)',
            animation: 'slide 3s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '35%',
            left: '28%',
            width: '2px',
            height: '40px',
            background: 'linear-gradient(180deg, transparent, rgba(58, 99, 145, 0.4), transparent)',
            animation: 'slide 3.5s ease-in-out infinite reverse'
          }}></div>
        </div>
        
        <div className="container g-0 line pt-140" style={{ position: 'relative', zIndex: 2 }}>
          <span className="line-3"></span>
          <div className="sec-title-wrapper">
            <div className="row">
              <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
                <h2 className="sec-sub-title title-anim" style={{ color: "white", fontSize: "1.2rem", marginBottom: "10px" }}>Influitive Zone</h2>
                <h3 className="sec-title title-anim" style={{ color: "white", fontSize: "3.5rem", fontWeight: "700", marginBottom: "20px" }}>Our Story</h3>
              </div>
              <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
                <div className="story__text">
                  <p style={{ color: "white" }}>
                  Your brand, in our opinion at Influitive Zone, is your greatest asset. Our goal is to make companies stand out by fusing cutting-edge tactics, imaginative ideas, and potent digital solutions. With experience in SEO, brand planning, and site and app design, we provide solutions that are not only aesthetically pleasing but also designed to function well in the cutthroat digital market of today.
                  </p>
                  <p style={{ color: "white" }}>
                  To overcome obstacles and create cohesive brand experiences, our team of researchers, strategists, designers, developers, and project managers collaborates effortlessly. We develop strategic, forward-thinking identities that stimulate growth, engage audiences, and make a lasting impression by converting research into workable solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3">
              <div className="story__img-wrapper">
                <Image
                  priority
                  width={300}
                  style={{ height: "auto" }}
                  src={Story1}
                  alt="Story Thumbnail"
                  className="w-100"
                />
              </div>
            </div>
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
              <div className="story__img-wrapper img-anim">
                <Image
                  priority
                  width={520}
                  style={{ height: "auto" }}
                  src={Story2}
                  alt="Story Thumbnail"
                  data-speed="auto"
                />
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
              <div className="story__img-wrapper">
                <Image
                  priority
                  width={230}
                  style={{ height: "auto" }}
                  src={Story3}
                  alt="Story Thumbnail"
                />
                <Image
                  priority
                  width={410}
                  style={{ height: "auto" }}
                  src={Story4}
                  alt="Story Thumbnail"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutStory;
