import { useEffect, useRef, useState, useCallback } from "react";
import Lottie from "lottie-react";
import runningRobotAnimation from "../../../public/running-robot.json";

const LottieCursor = ({ cursorRef }) => {
  const lottieRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleAnimationReady = useCallback(() => {
    if (lottieRef.current) {
      lottieRef.current.play();
      setIsLoaded(true);
      console.log("Lottie animation ready and playing");
    }
  }, []);

  useEffect(() => {
    // Ensure the animation plays on load
    if (lottieRef.current) {
      lottieRef.current.play();
      setIsLoaded(true);
    }
    
    // Debug: Log when component mounts
    console.log("LottieCursor component mounted");
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="lottie-cursor"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%)',
        width: '50px',
        height: '50px',
        opacity: 1,
        transition: 'opacity 0.3s ease',
        willChange: 'transform',
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
        }}
        onComplete={handleAnimationReady}
        onLoopComplete={handleAnimationReady}
        onDataReady={handleAnimationReady}
      />
    </div>
  );
};

export default LottieCursor;
