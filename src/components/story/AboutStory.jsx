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
        
        /* Ensure Our Story heading is always visible */
        .story__area .sec-title.title-anim,
        .story__area .sec-sub-title.title-anim {
          opacity: 1 !important;
          visibility: visible !important;
          display: block !important;
        }
        
        /* Fallback for animation - ensure text is visible */
        .story__area .title-anim {
          opacity: 1 !important;
          visibility: visible !important;
        }
        
        /* Override any GSAP animation that might hide the text */
        .story__area .sec-title-wrapper .title-anim {
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
        }
      `}</style>
      <section className="story__area" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Floating Dots Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1
        }}>
          {/* Floating Tech Dots */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '6px',
            height: '6px',
            background: 'rgba(137, 195, 229, 0.9)',
            borderRadius: '50%',
            animation: 'float 3s ease-in-out infinite',
            boxShadow: '0 0 10px rgba(137, 195, 229, 0.5)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '15%',
            width: '8px',
            height: '8px',
            background: 'rgba(58, 99, 145, 0.8)',
            borderRadius: '50%',
            animation: 'float 4s ease-in-out infinite reverse',
            boxShadow: '0 0 12px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '30%',
            left: '8%',
            width: '5px',
            height: '5px',
            background: 'rgba(137, 195, 229, 1)',
            borderRadius: '50%',
            animation: 'float 2.5s ease-in-out infinite',
            boxShadow: '0 0 8px rgba(137, 195, 229, 0.6)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '40%',
            left: '12%',
            width: '7px',
            height: '7px',
            background: 'rgba(58, 99, 145, 0.9)',
            borderRadius: '50%',
            animation: 'float 3.5s ease-in-out infinite reverse',
            boxShadow: '0 0 10px rgba(58, 99, 145, 0.5)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '6%',
            width: '6px',
            height: '6px',
            background: 'rgba(137, 195, 229, 0.95)',
            borderRadius: '50%',
            animation: 'float 2.8s ease-in-out infinite',
            boxShadow: '0 0 9px rgba(137, 195, 229, 0.5)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '60%',
            left: '10%',
            width: '5px',
            height: '5px',
            background: 'rgba(58, 99, 145, 0.85)',
            borderRadius: '50%',
            animation: 'float 3.2s ease-in-out infinite reverse',
            boxShadow: '0 0 8px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '70%',
            left: '7%',
            width: '7px',
            height: '7px',
            background: 'rgba(137, 195, 229, 0.8)',
            borderRadius: '50%',
            animation: 'float 2.2s ease-in-out infinite',
            boxShadow: '0 0 11px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '80%',
            left: '14%',
            width: '6px',
            height: '6px',
            background: 'rgba(58, 99, 145, 0.9)',
            borderRadius: '50%',
            animation: 'float 3.8s ease-in-out infinite reverse',
            boxShadow: '0 0 10px rgba(58, 99, 145, 0.5)'
          }}></div>
          
          {/* Additional floating dots for more visibility */}
          <div style={{
            position: 'absolute',
            top: '15%',
            left: '85%',
            width: '5px',
            height: '5px',
            background: 'rgba(137, 195, 229, 0.9)',
            borderRadius: '50%',
            animation: 'float 2.8s ease-in-out infinite',
            boxShadow: '0 0 8px rgba(137, 195, 229, 0.5)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '25%',
            left: '90%',
            width: '4px',
            height: '4px',
            background: 'rgba(58, 99, 145, 0.8)',
            borderRadius: '50%',
            animation: 'float 3.2s ease-in-out infinite reverse',
            boxShadow: '0 0 6px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '35%',
            left: '88%',
            width: '6px',
            height: '6px',
            background: 'rgba(137, 195, 229, 0.85)',
            borderRadius: '50%',
            animation: 'float 2.5s ease-in-out infinite',
            boxShadow: '0 0 9px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '45%',
            left: '92%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.9)',
            borderRadius: '50%',
            animation: 'float 3.5s ease-in-out infinite reverse',
            boxShadow: '0 0 7px rgba(58, 99, 145, 0.5)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '55%',
            left: '86%',
            width: '5px',
            height: '5px',
            background: 'rgba(137, 195, 229, 0.8)',
            borderRadius: '50%',
            animation: 'float 2.2s ease-in-out infinite',
            boxShadow: '0 0 8px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '65%',
            left: '89%',
            width: '4px',
            height: '4px',
            background: 'rgba(58, 99, 145, 0.85)',
            borderRadius: '50%',
            animation: 'float 3.8s ease-in-out infinite reverse',
            boxShadow: '0 0 6px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '75%',
            left: '91%',
            width: '6px',
            height: '6px',
            background: 'rgba(137, 195, 229, 0.9)',
            borderRadius: '50%',
            animation: 'float 2.8s ease-in-out infinite',
            boxShadow: '0 0 10px rgba(137, 195, 229, 0.5)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '85%',
            left: '87%',
            width: '5px',
            height: '5px',
            background: 'rgba(58, 99, 145, 0.8)',
            borderRadius: '50%',
            animation: 'float 3.2s ease-in-out infinite reverse',
            boxShadow: '0 0 8px rgba(58, 99, 145, 0.4)'
          }}></div>
          
          {/* Center area dots for better distribution */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            width: '4px',
            height: '4px',
            background: 'rgba(137, 195, 229, 0.9)',
            borderRadius: '50%',
            animation: 'float 2.5s ease-in-out infinite',
            boxShadow: '0 0 6px rgba(137, 195, 229, 0.5)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '40%',
            left: '45%',
            width: '6px',
            height: '6px',
            background: 'rgba(58, 99, 145, 0.85)',
            borderRadius: '50%',
            animation: 'float 3.5s ease-in-out infinite reverse',
            boxShadow: '0 0 8px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '60%',
            left: '55%',
            width: '5px',
            height: '5px',
            background: 'rgba(137, 195, 229, 0.8)',
            borderRadius: '50%',
            animation: 'float 2.8s ease-in-out infinite',
            boxShadow: '0 0 7px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '80%',
            left: '50%',
            width: '4px',
            height: '4px',
            background: 'rgba(58, 99, 145, 0.9)',
            borderRadius: '50%',
            animation: 'float 3.2s ease-in-out infinite reverse',
            boxShadow: '0 0 6px rgba(58, 99, 145, 0.5)'
          }}></div>
          
          {/* Dense dots covering the Our Story text area (red outlined section) */}
          <div style={{
            position: 'absolute',
            top: '5%',
            left: '2%',
            width: '3px',
            height: '3px',
            background: 'rgba(137, 195, 229, 0.9)',
            borderRadius: '50%',
            animation: 'float 2.8s ease-in-out infinite',
            boxShadow: '0 0 6px rgba(137, 195, 229, 0.5)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '8%',
            left: '5%',
            width: '4px',
            height: '4px',
            background: 'rgba(58, 99, 145, 0.8)',
            borderRadius: '50%',
            animation: 'float 3.1s ease-in-out infinite reverse',
            boxShadow: '0 0 7px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '12%',
            left: '8%',
            width: '3px',
            height: '3px',
            background: 'rgba(137, 195, 229, 0.9)',
            borderRadius: '50%',
            animation: 'float 2.6s ease-in-out infinite',
            boxShadow: '0 0 5px rgba(137, 195, 229, 0.5)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '15%',
            left: '3%',
            width: '5px',
            height: '5px',
            background: 'rgba(58, 99, 145, 0.85)',
            borderRadius: '50%',
            animation: 'float 3.4s ease-in-out infinite reverse',
            boxShadow: '0 0 8px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '18%',
            left: '6%',
            width: '4px',
            height: '4px',
            background: 'rgba(137, 195, 229, 0.8)',
            borderRadius: '50%',
            animation: 'float 2.9s ease-in-out infinite',
            boxShadow: '0 0 6px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '22%',
            left: '1%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.9)',
            borderRadius: '50%',
            animation: 'float 3.3s ease-in-out infinite reverse',
            boxShadow: '0 0 5px rgba(58, 99, 145, 0.5)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '25%',
            left: '4%',
            width: '5px',
            height: '5px',
            background: 'rgba(137, 195, 229, 0.85)',
            borderRadius: '50%',
            animation: 'float 2.7s ease-in-out infinite',
            boxShadow: '0 0 7px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '28%',
            left: '7%',
            width: '4px',
            height: '4px',
            background: 'rgba(58, 99, 145, 0.8)',
            borderRadius: '50%',
            animation: 'float 3.0s ease-in-out infinite reverse',
            boxShadow: '0 0 6px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '32%',
            left: '2%',
            width: '3px',
            height: '3px',
            background: 'rgba(137, 195, 229, 0.9)',
            borderRadius: '50%',
            animation: 'float 2.8s ease-in-out infinite',
            boxShadow: '0 0 5px rgba(137, 195, 229, 0.5)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '35%',
            left: '5%',
            width: '4px',
            height: '4px',
            background: 'rgba(58, 99, 145, 0.85)',
            borderRadius: '50%',
            animation: 'float 3.2s ease-in-out infinite reverse',
            boxShadow: '0 0 6px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '38%',
            left: '8%',
            width: '5px',
            height: '5px',
            background: 'rgba(137, 195, 229, 0.8)',
            borderRadius: '50%',
            animation: 'float 2.5s ease-in-out infinite',
            boxShadow: '0 0 7px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '42%',
            left: '3%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.9)',
            borderRadius: '50%',
            animation: 'float 3.5s ease-in-out infinite reverse',
            boxShadow: '0 0 5px rgba(58, 99, 145, 0.5)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '45%',
            left: '6%',
            width: '4px',
            height: '4px',
            background: 'rgba(137, 195, 229, 0.85)',
            borderRadius: '50%',
            animation: 'float 2.9s ease-in-out infinite',
            boxShadow: '0 0 6px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '48%',
            left: '1%',
            width: '5px',
            height: '5px',
            background: 'rgba(58, 99, 145, 0.8)',
            borderRadius: '50%',
            animation: 'float 3.1s ease-in-out infinite reverse',
            boxShadow: '0 0 7px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '52%',
            left: '4%',
            width: '3px',
            height: '3px',
            background: 'rgba(137, 195, 229, 0.9)',
            borderRadius: '50%',
            animation: 'float 2.6s ease-in-out infinite',
            boxShadow: '0 0 5px rgba(137, 195, 229, 0.5)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '55%',
            left: '7%',
            width: '4px',
            height: '4px',
            background: 'rgba(58, 99, 145, 0.85)',
            borderRadius: '50%',
            animation: 'float 3.3s ease-in-out infinite reverse',
            boxShadow: '0 0 6px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '58%',
            left: '2%',
            width: '5px',
            height: '5px',
            background: 'rgba(137, 195, 229, 0.8)',
            borderRadius: '50%',
            animation: 'float 2.8s ease-in-out infinite',
            boxShadow: '0 0 7px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '62%',
            left: '5%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.9)',
            borderRadius: '50%',
            animation: 'float 3.4s ease-in-out infinite reverse',
            boxShadow: '0 0 5px rgba(58, 99, 145, 0.5)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '65%',
            left: '8%',
            width: '4px',
            height: '4px',
            background: 'rgba(137, 195, 229, 0.85)',
            borderRadius: '50%',
            animation: 'float 2.7s ease-in-out infinite',
            boxShadow: '0 0 6px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '68%',
            left: '3%',
            width: '5px',
            height: '5px',
            background: 'rgba(58, 99, 145, 0.8)',
            borderRadius: '50%',
            animation: 'float 3.0s ease-in-out infinite reverse',
            boxShadow: '0 0 7px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '72%',
            left: '6%',
            width: '3px',
            height: '3px',
            background: 'rgba(137, 195, 229, 0.9)',
            borderRadius: '50%',
            animation: 'float 2.9s ease-in-out infinite',
            boxShadow: '0 0 5px rgba(137, 195, 229, 0.5)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '75%',
            left: '1%',
            width: '4px',
            height: '4px',
            background: 'rgba(58, 99, 145, 0.85)',
            borderRadius: '50%',
            animation: 'float 3.2s ease-in-out infinite reverse',
            boxShadow: '0 0 6px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '78%',
            left: '4%',
            width: '5px',
            height: '5px',
            background: 'rgba(137, 195, 229, 0.8)',
            borderRadius: '50%',
            animation: 'float 2.5s ease-in-out infinite',
            boxShadow: '0 0 7px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '82%',
            left: '7%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.9)',
            borderRadius: '50%',
            animation: 'float 3.5s ease-in-out infinite reverse',
            boxShadow: '0 0 5px rgba(58, 99, 145, 0.5)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '85%',
            left: '2%',
            width: '4px',
            height: '4px',
            background: 'rgba(137, 195, 229, 0.85)',
            borderRadius: '50%',
            animation: 'float 2.8s ease-in-out infinite',
            boxShadow: '0 0 6px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '88%',
            left: '5%',
            width: '5px',
            height: '5px',
            background: 'rgba(58, 99, 145, 0.8)',
            borderRadius: '50%',
            animation: 'float 3.1s ease-in-out infinite reverse',
            boxShadow: '0 0 7px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '92%',
            left: '8%',
            width: '3px',
            height: '3px',
            background: 'rgba(137, 195, 229, 0.9)',
            borderRadius: '50%',
            animation: 'float 2.6s ease-in-out infinite',
            boxShadow: '0 0 5px rgba(137, 195, 229, 0.5)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '95%',
            left: '3%',
            width: '4px',
            height: '4px',
            background: 'rgba(58, 99, 145, 0.85)',
            borderRadius: '50%',
            animation: 'float 3.3s ease-in-out infinite reverse',
            boxShadow: '0 0 6px rgba(58, 99, 145, 0.4)'
          }}></div>
          
          {/* Additional dense dots for better coverage */}
          <div style={{
            position: 'absolute',
            top: '7%',
            left: '3%',
            width: '2px',
            height: '2px',
            background: 'rgba(137, 195, 229, 0.7)',
            borderRadius: '50%',
            animation: 'float 2.4s ease-in-out infinite',
            boxShadow: '0 0 4px rgba(137, 195, 229, 0.3)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '6%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.75)',
            borderRadius: '50%',
            animation: 'float 3.6s ease-in-out infinite reverse',
            boxShadow: '0 0 5px rgba(58, 99, 145, 0.3)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '14%',
            left: '1%',
            width: '2px',
            height: '2px',
            background: 'rgba(137, 195, 229, 0.8)',
            borderRadius: '50%',
            animation: 'float 2.3s ease-in-out infinite',
            boxShadow: '0 0 4px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '17%',
            left: '4%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.8)',
            borderRadius: '50%',
            animation: 'float 3.7s ease-in-out infinite reverse',
            boxShadow: '0 0 5px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '7%',
            width: '2px',
            height: '2px',
            background: 'rgba(137, 195, 229, 0.75)',
            borderRadius: '50%',
            animation: 'float 2.5s ease-in-out infinite',
            boxShadow: '0 0 4px rgba(137, 195, 229, 0.3)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '24%',
            left: '2%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.85)',
            borderRadius: '50%',
            animation: 'float 3.8s ease-in-out infinite reverse',
            boxShadow: '0 0 5px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '27%',
            left: '5%',
            width: '2px',
            height: '2px',
            background: 'rgba(137, 195, 229, 0.8)',
            borderRadius: '50%',
            animation: 'float 2.2s ease-in-out infinite',
            boxShadow: '0 0 4px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '30%',
            left: '8%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.75)',
            borderRadius: '50%',
            animation: 'float 3.9s ease-in-out infinite reverse',
            boxShadow: '0 0 5px rgba(58, 99, 145, 0.3)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '34%',
            left: '1%',
            width: '2px',
            height: '2px',
            background: 'rgba(137, 195, 229, 0.85)',
            borderRadius: '50%',
            animation: 'float 2.1s ease-in-out infinite',
            boxShadow: '0 0 4px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '37%',
            left: '4%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.8)',
            borderRadius: '50%',
            animation: 'float 4.0s ease-in-out infinite reverse',
            boxShadow: '0 0 5px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '41%',
            left: '7%',
            width: '2px',
            height: '2px',
            background: 'rgba(137, 195, 229, 0.75)',
            borderRadius: '50%',
            animation: 'float 2.0s ease-in-out infinite',
            boxShadow: '0 0 4px rgba(137, 195, 229, 0.3)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '44%',
            left: '2%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.85)',
            borderRadius: '50%',
            animation: 'float 4.1s ease-in-out infinite reverse',
            boxShadow: '0 0 5px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '47%',
            left: '5%',
            width: '2px',
            height: '2px',
            background: 'rgba(137, 195, 229, 0.8)',
            borderRadius: '50%',
            animation: 'float 1.9s ease-in-out infinite',
            boxShadow: '0 0 4px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '51%',
            left: '8%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.75)',
            borderRadius: '50%',
            animation: 'float 4.2s ease-in-out infinite reverse',
            boxShadow: '0 0 5px rgba(58, 99, 145, 0.3)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '54%',
            left: '1%',
            width: '2px',
            height: '2px',
            background: 'rgba(137, 195, 229, 0.85)',
            borderRadius: '50%',
            animation: 'float 1.8s ease-in-out infinite',
            boxShadow: '0 0 4px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '57%',
            left: '4%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.8)',
            borderRadius: '50%',
            animation: 'float 4.3s ease-in-out infinite reverse',
            boxShadow: '0 0 5px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '61%',
            left: '7%',
            width: '2px',
            height: '2px',
            background: 'rgba(137, 195, 229, 0.75)',
            borderRadius: '50%',
            animation: 'float 1.7s ease-in-out infinite',
            boxShadow: '0 0 4px rgba(137, 195, 229, 0.3)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '64%',
            left: '2%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.85)',
            borderRadius: '50%',
            animation: 'float 4.4s ease-in-out infinite reverse',
            boxShadow: '0 0 5px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '67%',
            left: '5%',
            width: '2px',
            height: '2px',
            background: 'rgba(137, 195, 229, 0.8)',
            borderRadius: '50%',
            animation: 'float 1.6s ease-in-out infinite',
            boxShadow: '0 0 4px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '71%',
            left: '8%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.75)',
            borderRadius: '50%',
            animation: 'float 4.5s ease-in-out infinite reverse',
            boxShadow: '0 0 5px rgba(58, 99, 145, 0.3)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '74%',
            left: '1%',
            width: '2px',
            height: '2px',
            background: 'rgba(137, 195, 229, 0.85)',
            borderRadius: '50%',
            animation: 'float 1.5s ease-in-out infinite',
            boxShadow: '0 0 4px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '77%',
            left: '4%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.8)',
            borderRadius: '50%',
            animation: 'float 4.6s ease-in-out infinite reverse',
            boxShadow: '0 0 5px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '81%',
            left: '7%',
            width: '2px',
            height: '2px',
            background: 'rgba(137, 195, 229, 0.75)',
            borderRadius: '50%',
            animation: 'float 1.4s ease-in-out infinite',
            boxShadow: '0 0 4px rgba(137, 195, 229, 0.3)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '84%',
            left: '2%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.85)',
            borderRadius: '50%',
            animation: 'float 4.7s ease-in-out infinite reverse',
            boxShadow: '0 0 5px rgba(58, 99, 145, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '87%',
            left: '5%',
            width: '2px',
            height: '2px',
            background: 'rgba(137, 195, 229, 0.8)',
            borderRadius: '50%',
            animation: 'float 1.3s ease-in-out infinite',
            boxShadow: '0 0 4px rgba(137, 195, 229, 0.4)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '91%',
            left: '8%',
            width: '3px',
            height: '3px',
            background: 'rgba(58, 99, 145, 0.75)',
            borderRadius: '50%',
            animation: 'float 4.8s ease-in-out infinite reverse',
            boxShadow: '0 0 5px rgba(58, 99, 145, 0.3)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '94%',
            left: '3%',
            width: '2px',
            height: '2px',
            background: 'rgba(137, 195, 229, 0.85)',
            borderRadius: '50%',
            animation: 'float 1.2s ease-in-out infinite',
            boxShadow: '0 0 4px rgba(137, 195, 229, 0.4)'
          }}></div>
        </div>
        
        <div className="container g-0 line pt-140" style={{ position: 'relative', zIndex: 2 }}>
          <span className="line-3"></span>
          <div className="sec-title-wrapper">
            <div className="row">
              <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
                <h2 className="sec-sub-title title-anim" style={{ color: "white", fontSize: "1.2rem", marginBottom: "10px", opacity: 1, visibility: "visible" }}>Influitive Zone</h2>
                <h3 className="sec-title title-anim" style={{ color: "white", fontSize: "3.5rem", fontWeight: "700", marginBottom: "20px", opacity: 1, visibility: "visible" }}>Our Story</h3>
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
