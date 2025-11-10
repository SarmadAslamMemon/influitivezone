import { useRef } from "react";

const LottieCursor = ({ cursorRef }) => {
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
        width: '8px',
        height: '8px',
        opacity: 1,
        transition: 'none',
        willChange: 'transform',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        visibility: 'visible',
      }}
    >
      <div 
        style={{
          width: '8px',
          height: '8px',
          background: '#4a90e2',
          borderRadius: '50%',
          boxShadow: '0 0 4px rgba(74, 144, 226, 0.5)',
        }} 
      />
    </div>
  );
};

export default LottieCursor;
