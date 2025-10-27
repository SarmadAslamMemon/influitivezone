import { useEffect, useRef, useState, useCallback } from "react";
import Lottie from "lottie-react";
import runningRobotAnimation from "../../../public/running-robot.json";

const LottieCursor = ({ cursorRef }) => {
  const lottieRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleAnimationReady = useCallback(() => {
    if (lottieRef.current) {
      lottieRef.current.play();
      setIsLoaded(true);
      console.log("Lottie animation ready and playing");
    }
  }, []);

  const handleError = useCallback((error) => {
    console.error("Lottie animation error:", error);
    setHasError(true);
  }, []);

  useEffect(() => {
    // Ensure the animation plays on load
    if (lottieRef.current) {
      lottieRef.current.play();
      setIsLoaded(true);
    }
    
    // Debug: Log when component mounts
    console.log("LottieCursor component mounted");
    console.log("Animation data:", runningRobotAnimation);
    
    // Check if the cursor element is visible
    setTimeout(() => {
      const cursorElement = document.querySelector('.lottie-cursor');
      if (cursorElement) {
        console.log("Cursor element found:", cursorElement);
        console.log("Cursor styles:", window.getComputedStyle(cursorElement));
        console.log("Cursor position:", cursorElement.getBoundingClientRect());
      } else {
        console.log("Cursor element not found");
      }
    }, 1000);
  }, []);

  // Fallback if animation fails to load
  if (hasError) {
    return (
      <div 
        ref={cursorRef}
        className="lottie-cursor"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          pointerEvents: 'none',
          zIndex: 100000,
          transform: 'translate(-50%, -50%)',
          transformOrigin: 'center center',
          width: '50px',
          height: '50px',
          opacity: 1,
          transition: 'none',
          willChange: 'transform',
          background: 'radial-gradient(circle, #00a8ff 0%, #0078d4 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          width: '20px',
          height: '20px',
          background: 'white',
          borderRadius: '50%',
          opacity: 0.8,
        }} />
      </div>
    );
  }

  return (
    <div 
      ref={cursorRef}
      className="lottie-cursor"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 100000,
        transform: 'translate(-50%, -50%)',
        transformOrigin: 'center center',
        width: '50px',
        height: '50px',
        opacity: 1,
        transition: 'none',
        willChange: 'transform',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        visibility: 'visible',
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={runningRobotAnimation}
        loop={true}
        autoplay={true}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice',
          progressiveLoad: true,
          hideOnTransparent: false,
          clearCanvas: false,
        }}
        style={{
          width: '100%',
          height: '100%',
          opacity: 1,
          visibility: 'visible',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onComplete={handleAnimationReady}
        onLoopComplete={handleAnimationReady}
        onDataReady={handleAnimationReady}
        onError={handleError}
      />
    </div>
  );
};

export default LottieCursor;
