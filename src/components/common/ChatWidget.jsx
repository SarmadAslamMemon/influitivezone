import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { gsap } from 'gsap';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [lottieData, setLottieData] = useState(null);
  const [showTypingDots, setShowTypingDots] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showBlurBackground, setShowBlurBackground] = useState(false);
  const [showColorEffects, setShowColorEffects] = useState(false);
  const [aiRobotLottieData, setAiRobotLottieData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  
  // GSAP refs
  const widgetRef = useRef(null);
  const rippleRef = useRef(null);
  const particlesRef = useRef(null);
  const glowRef = useRef(null);
  const chatBoxRef = useRef(null);
  const backdropRef = useRef(null);

  // Load Lottie animation data
  useEffect(() => {
    const loadLottieData = async () => {
      try {
        const response = await fetch('/Live chatbot.json');
        const data = await response.json();
        setLottieData(data);
      } catch (error) {
        console.log('Using fallback robot emoji');
      }
    };
    loadLottieData();
  }, []);

  // Load AI Robot Assistant Lottie animation data
  useEffect(() => {
    const loadAiRobotLottieData = async () => {
      try {
        const response = await fetch('/AI robot assistant.json');
        const data = await response.json();
        setAiRobotLottieData(data);
      } catch (error) {
        console.log('AI robot assistant animation not found');
      }
    };
    loadAiRobotLottieData();
  }, []);

  // Handle mobile detection and window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Set initial value
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);


  // Function to render message content with clickable links
  const renderMessageContent = (content) => {
    // Simple URL detection regex
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);
    
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a 
            key={index} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: '#007bff',
              textDecoration: 'underline',
              fontWeight: 'bold'
            }}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  // Generate session ID when chat widget first opens
  useEffect(() => {
    if (open && !sessionId) {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);
      console.log('🔑 Generated new session ID:', newSessionId);
      console.log('🌐 BACKEND_URL:', BACKEND_URL);
      console.log('🔗 Full API URL will be:', `${BACKEND_URL}/api/chat`);
      
      // Test API connectivity
      fetch(`${BACKEND_URL}/api/health`)
        .then(res => res.json())
        .then(data => console.log('✅ Backend health check successful:', data))
        .catch(err => console.error('❌ Backend health check failed:', err));
    }
  }, [open, sessionId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to play your custom voice MP3 (only when chat opens)
  const playCustomVoice = () => {
    try {
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Create audio element for your custom voice
      const audio = new Audio();
      audioRef.current = audio;
      audio.src = '/audio/2025-09-09-061802_112388.mp3'; // Your custom voice file
      
      audio.play().catch(error => {
        console.log('Custom voice not found, falling back to speech synthesis');
        // Fallback to browser speech synthesis
        if (synthRef.current) {
          const utter = new SpeechSynthesisUtterance('Hello, welcome to Influitive Zone, the horizon of technology!');
          synthRef.current.speak(utter);
        }
      });
    } catch (error) {
      console.log('Error playing custom voice:', error);
      // Fallback to browser speech synthesis
      if (synthRef.current) {
        const utter = new SpeechSynthesisUtterance('Hello, welcome to Influitive Zone, the horizon of technology!');
        synthRef.current.speak(utter);
      }
    }
  };

  // GSAP click animation sequence
  const triggerClickAnimations = () => {
    console.log('Starting click animations...');
    
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
      console.error('GSAP is not loaded!');
      return;
    }

    // Wait a bit for DOM to be ready
    setTimeout(() => {
      console.log('Widget ref:', widgetRef.current);
      console.log('Ripple ref:', rippleRef.current);
      console.log('Glow ref:', glowRef.current);
      console.log('Particles ref:', particlesRef.current);

      // 1. Bounce and wiggle the widget
      if (widgetRef.current) {
        console.log('Animating widget...');
        gsap.to(widgetRef.current, {
          scale: 1.2,
          rotation: 10,
          duration: 0.3,
          ease: "back.out(1.7)",
          onComplete: () => {
            gsap.to(widgetRef.current, {
              scale: 0.9,
              rotation: -5,
              duration: 0.2,
              ease: "power2.out",
              onComplete: () => {
                gsap.to(widgetRef.current, {
                  scale: 1,
                  rotation: 0,
                  duration: 0.3,
                  ease: "elastic.out(1, 0.3)"
                });
              }
            });
          }
        });
      } else {
        console.log('Widget ref not found');
      }

      // 2. Ripple effect
      if (rippleRef.current) {
        console.log('Animating ripple...');
        gsap.fromTo(rippleRef.current, 
          { scale: 0, opacity: 0.8 },
          { 
            scale: 4, 
            opacity: 0, 
            duration: 1.5, 
            ease: "power2.out"
          }
        );
      } else {
        console.log('Ripple ref not found');
      }

      // 3. Glow pulse
      if (glowRef.current) {
        console.log('Animating glow...');
        gsap.fromTo(glowRef.current,
          { scale: 0.5, opacity: 0 },
          {
            scale: 2,
            opacity: 0.8,
            duration: 0.8,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
          }
        );
      } else {
        console.log('Glow ref not found');
      }

      // 4. Particle burst
      const particles = particlesRef.current?.children;
      if (particles && particles.length > 0) {
        console.log(`Animating ${particles.length} particles`);
        Array.from(particles).forEach((particle, i) => {
          const angle = (i * 30) * (Math.PI / 180);
          const distance = 120 + Math.random() * 80;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          
          gsap.fromTo(particle,
            { scale: 0, opacity: 1, x: 0, y: 0 },
            {
              scale: 1.5,
              opacity: 0,
              x: x,
              y: y,
              duration: 2,
              ease: "power2.out",
              delay: i * 0.05
            }
          );
        });
      } else {
        console.log('No particles found');
      }
    }, 100);
  };

  // Chat box opening animation
  const openChatBox = () => {
    const tl = gsap.timeline();
    
    // Backdrop fade in
    tl.to(backdropRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });

    // Chat box spring in
    tl.fromTo(chatBoxRef.current,
      { 
        scale: 0.3, 
        opacity: 0, 
        y: 50,
        rotationX: -15
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        transformOrigin: "bottom right"
      }, "-=0.1"
    );

    // Show welcome message immediately after chat box appears
    tl.call(() => {
      const greet = {
        role: 'assistant',
        content: 'Hello, welcome to Influitive Zone, the horizon of technology!'
      };
      setMessages([greet]);
      // Sound already played on click, no need to play again
    }, null, 0.2); // Small delay just for the chat box to appear
  };

  useEffect(() => {
    if (!open) return;
    openChatBox();
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || isTyping || !sessionId) return;
    
    const newHistory = [...messages, { role: 'user', content: text }];
    setMessages(newHistory);
    setInput('');
    setIsTyping(true);
    
    const apiUrl = `${BACKEND_URL}/api/chat`;
    console.log('🔗 Calling API:', apiUrl);
    console.log('📦 Payload:', { message: text, sessionId: sessionId });
    
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text,
          sessionId: sessionId 
        }),
      });
      
      console.log('📡 Response status:', res.status);
      console.log('📡 Response ok:', res.ok);
      
      const data = await res.json();
      console.log('📥 Response data:', data);
      
      if (!res.ok) {
        const assistantMsg = { role: 'assistant', content: data?.error || `Server error (${res.status})` };
        setMessages((m) => [...m, assistantMsg]);
        return;
      }
      
      if (data.success) {
        const textReply = data.reply || 'Sorry, something went wrong.';
        const assistantMsg = { role: 'assistant', content: textReply };
        setMessages((m) => [...m, assistantMsg]);
        
        // Handle lead capture notification
        if (data.leadSaved && data.leadInfo) {
          console.log('✅ Lead captured:', data.leadInfo);
          // Optional: Show a subtle notification to user that their info was captured
          // You could add a toast notification here if desired
        }
        
        // Log tone detection for debugging
        if (data.tone) {
          console.log(`🎭 Detected tone: ${data.tone} (confidence: ${data.confidence})`);
        }
        
        // Update session ID if backend provides a different one
        if (data.sessionId && data.sessionId !== sessionId) {
          setSessionId(data.sessionId);
          console.log('🔄 Updated session ID:', data.sessionId);
        }
      } else {
        const assistantMsg = { role: 'assistant', content: data.error || 'Sorry, something went wrong.' };
        setMessages((m) => [...m, assistantMsg]);
      }
      
      // No audio for regular responses - only your custom voice when chat opens
    } catch (e) {
      console.error('❌ Network error:', e);
      const assistantMsg = { role: 'assistant', content: 'Network error. Please try again.' };
      setMessages((m) => [...m, assistantMsg]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div style={{ position: 'fixed', right: '20px', bottom: '20px', zIndex: 9999 }}>
      {/* Animation Elements - Always Present */}
      <div 
        ref={particlesRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 10000,
          width: 0,
          height: 0
        }}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 8,
              height: 8,
              background: `hsl(${i * 30}, 80%, 60%)`,
              borderRadius: '50%',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 15px currentColor',
              opacity: 0
            }}
          />
        ))}
      </div>
      
      <div 
        ref={rippleRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 120,
          height: 120,
          border: '3px solid rgba(45, 55, 72, 0.6)',
          borderRadius: '50%',
          pointerEvents: 'none',
          opacity: 0,
          scale: 0,
          animation: isAnimating ? 'rippleEffect 1.5s ease-out' : 'none'
        }}
      />
      
      <div 
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 160,
          height: 160,
          background: 'radial-gradient(circle, rgba(45, 55, 72, 0.5) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          opacity: 0,
          scale: 0.5,
          animation: isAnimating ? 'glowPulse 1.6s ease-out' : 'none'
        }}
      />

      {!open && (
        <div style={{ 
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        onClick={() => {
          console.log('Widget clicked!');
          // Play sound immediately on click for better responsiveness
          playCustomVoice();
          setShowBlurBackground(true);
          setIsAnimating(true);
          triggerClickAnimations();
          setOpen(true);
          // Reset animation after 2 seconds
          setTimeout(() => {
            setIsAnimating(false);
          }, 2000);
        }}>
          {/* Main Widget Container */}
          <div 
            ref={widgetRef}
            style={{
              width: isMobile ? 80 : 120,
              height: isMobile ? 80 : 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              animation: isAnimating ? 'widgetBounce 0.8s ease-out' : 'none'
            }}
          >
            {lottieData ? (
              <Lottie 
                animationData={lottieData} 
                style={{ 
                  width: isMobile ? 70 : 110, 
                  height: isMobile ? 70 : 110
                }}
                loop={true}
                autoplay={true}
              />
            ) : (
              <span style={{ 
                fontSize: isMobile ? 50 : 70,
                display: 'inline-block'
              }}>🤖</span>
            )}
          </div>
        </div>
      )}
      
       {/* Blur Background - Only visible when chat is open */}
       {open && showBlurBackground && (
        <div 
          ref={backdropRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(8px)',
            zIndex: 9996,
            opacity: 1,
            transition: 'all 0.3s ease'
          }}
          onClick={(e) => {
            // Show color effects when clicking on blurred background
            if (e.target === e.currentTarget) {
              setShowColorEffects(true);
              setTimeout(() => setShowColorEffects(false), 2000);
            }
          }}
        />
      )}

      {/* Color Effects Overlay */}
      {open && showColorEffects && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9997,
          pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4) 0%, rgba(30, 41, 59, 0.3) 25%, rgba(51, 65, 85, 0.2) 50%, rgba(71, 85, 105, 0.3) 75%, rgba(100, 116, 139, 0.4) 100%)',
          animation: 'colorPulse 2s ease-out'
        }} />
      )}


       {/* Full Screen Dark Blueish Background - Only when chat is open */}
       {open && (
         <div style={{
           position: 'fixed',
           top: 0,
           left: 0,
           width: '100%',
           height: '100vh',
           zIndex: 9995,
           background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.7) 25%, rgba(51, 65, 85, 0.6) 50%, rgba(71, 85, 105, 0.7) 75%, rgba(100, 116, 139, 0.8) 100%)',
           animation: 'phoenixFadeIn 0.8s ease-out',
           overflow: 'hidden',
           pointerEvents: 'none'
         }} />
       )}

      {/* Left Side AI Robot Assistant Animation - Only when chat is open */}
      {open && aiRobotLottieData && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isMobile ? '100%' : '50%',
          height: '100vh',
          zIndex: 9999,
          display: isMobile ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          animation: 'phoenixFadeIn 0.8s ease-out',
          overflow: 'hidden'
        }}>
          {/* AI Robot Assistant Lottie Animation */}
          <div style={{
            width: '80%',
            height: '80%',
            maxWidth: '400px',
            maxHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'aiRobotFloat 3s ease-in-out infinite'
          }}>
            <Lottie 
              animationData={aiRobotLottieData} 
              style={{ 
                width: '100%', 
                height: '100%',
                filter: 'drop-shadow(0 10px 20px rgba(59, 130, 246, 0.4))'
              }}
              loop={true}
              autoplay={true}
            />
          </div>
          
          {/* Floating particles around AI Robot Assistant */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none'
          }}>
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: Math.random() * 8 + 4,
                  height: Math.random() * 8 + 4,
                  background: `hsl(${Math.random() * 40 + 200}, 70%, 60%)`, // Dark blueish colors
                  borderRadius: '50%',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                   animation: `aiRobotParticle ${Math.random() * 4 + 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                  boxShadow: '0 0 15px currentColor'
                }}
              />
            ))}
          </div>
        </div>
      )}

      {open && (
        <div 
          ref={chatBoxRef}
          style={{ 
            width: isMobile ? '95vw' : 380,
            height: isMobile ? '90vh' : 500,
            maxWidth: isMobile ? 'none' : '380px',
            maxHeight: isMobile ? 'none' : '500px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: isMobile ? 15 : 20,
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)', 
            display: 'flex', 
            flexDirection: 'column', 
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: isMobile ? 'fixed' : 'relative',
            top: isMobile ? '5vh' : 'auto',
            left: isMobile ? '2.5vw' : 'auto',
            right: isMobile ? '2.5vw' : 'auto',
            zIndex: 10000
          }}
        >
          {/* Header */}
          <div style={{ 
            padding: isMobile ? '15px 15px 12px' : '20px 20px 15px',
            background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)', 
            color: '#fff', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 12 }}>
              <div style={{ 
                width: isMobile ? 40 : 50, 
                height: isMobile ? 40 : 50, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                {lottieData ? (
                  <Lottie 
                    animationData={lottieData} 
                    style={{ 
                      width: isMobile ? 35 : 45, 
                      height: isMobile ? 35 : 45 
                    }}
                    loop={true}
                    autoplay={true}
                  />
                ) : (
                  <span style={{ fontSize: isMobile ? 20 : 25 }}>🤖</span>
                )}
              </div>
              <div>
                <div style={{ 
                  fontWeight: 'bold', 
                  fontSize: isMobile ? 14 : 16 
                }}>Influitive Zone</div>
                <div style={{ 
                  fontSize: isMobile ? 10 : 12, 
                  opacity: 0.9 
                }}>AI Assistant</div>
              </div>
            </div>
             <button 
               onClick={() => {
                 setOpen(false);
                 setShowBlurBackground(false);
                 setShowColorEffects(false);
               }} 
               style={{
                background: 'rgba(255,255,255,0.2)', 
                color: '#fff', 
                border: 'none', 
                width: isMobile ? 28 : 32,
                height: isMobile ? 28 : 32,
                borderRadius: '50%',
                fontSize: isMobile ? 16 : 18,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            >
              ×
            </button>
          </div>
          
          {/* Floating Background Shapes */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
            zIndex: 0
          }}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: Math.random() * 60 + 20,
                  height: Math.random() * 60 + 20,
                  background: `rgba(45, 55, 72, ${Math.random() * 0.1 + 0.02})`,
                  borderRadius: '50%',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float${i} ${Math.random() * 10 + 15}s infinite linear`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}
          </div>

          {/* Messages */}
          <div style={{ 
            flex: 1, 
            padding: isMobile ? '15px' : '20px',
            overflowY: 'auto', 
            background: 'rgba(248, 250, 252, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? 8 : 12,
            position: 'relative',
            zIndex: 1
          }}>
            {showTypingDots && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ 
                  padding: '12px 16px', 
                  borderRadius: '20px 20px 20px 5px', 
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(226, 232, 240, 0.5)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2d3748', animation: 'bounce 1.4s infinite ease-in-out' }}></div>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2d3748', animation: 'bounce 1.4s infinite ease-in-out 0.2s' }}></div>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2d3748', animation: 'bounce 1.4s infinite ease-in-out 0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            {messages.map((m, idx) => (
              <div key={idx} style={{ 
                display: 'flex', 
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{ 
                  maxWidth: isMobile ? '85%' : '80%',
                  padding: isMobile ? '10px 14px' : '12px 16px',
                  borderRadius: m.role === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px', 
                  background: m.role === 'user' ? 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)' : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: m.role === 'user' ? 'none' : 'blur(10px)',
                  color: m.role === 'user' ? '#fff' : '#2d3748',
                  boxShadow: m.role === 'user' ? '0 4px 12px rgba(45, 55, 72, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
                  border: m.role === 'user' ? 'none' : '1px solid rgba(226, 232, 240, 0.5)',
                  fontSize: isMobile ? 13 : 14,
                  lineHeight: 1.4,
                  wordWrap: 'break-word'
                }}>
                  {renderMessageContent(m.content)}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ 
                  padding: '12px 16px', 
                  borderRadius: '20px 20px 20px 5px', 
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(226, 232, 240, 0.5)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2d3748', animation: 'bounce 1.4s infinite ease-in-out' }}></div>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2d3748', animation: 'bounce 1.4s infinite ease-in-out 0.2s' }}></div>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2d3748', animation: 'bounce 1.4s infinite ease-in-out 0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div style={{ 
            padding: isMobile ? '15px' : '20px',
            background: '#fff',
            borderTop: '1px solid #e2e8f0',
            display: 'flex', 
            gap: isMobile ? 8 : 12,
            alignItems: 'center'
          }}>
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && send()}
              placeholder="Type your message..." 
              disabled={isTyping}
              style={{ 
                flex: 1, 
                padding: isMobile ? '10px 14px' : '12px 16px',
                borderRadius: 25, 
                border: '2px solid #e2e8f0',
                outline: 'none',
                fontSize: isMobile ? 13 : 14,
                transition: 'border-color 0.2s ease',
                background: isTyping ? '#f7fafc' : '#fff'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2d3748'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
            <button 
              onClick={send} 
              disabled={isTyping || !input.trim()}
              style={{ 
                padding: isMobile ? '10px' : '12px',
                background: isTyping || !input.trim() ? '#cbd5e0' : 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
                color: '#fff', 
                border: 'none', 
                borderRadius: '50%',
                width: isMobile ? 40 : 48,
                height: isMobile ? 40 : 48,
                cursor: isTyping || !input.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? 16 : 18,
                transition: 'all 0.2s ease',
                boxShadow: isTyping || !input.trim() ? 'none' : '0 4px 12px rgba(45, 55, 72, 0.3)'
              }}
            >
              {isTyping ? '⏳' : '➤'}
            </button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        @keyframes widgetBounce {
          0% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.2) rotate(5deg); }
          50% { transform: scale(0.9) rotate(-3deg); }
          75% { transform: scale(1.1) rotate(2deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes rippleEffect {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
        @keyframes glowPulse {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
          50% { transform: translate(-50%, -50%) scale(2); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        }
        @keyframes particleBurst {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) translate(100px, 0px) scale(1.5); opacity: 0; }
        }
        @keyframes float0 {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          50% { transform: translate(-50%, -50%) translateY(-20px) rotate(180deg); }
        }
        @keyframes float1 {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          50% { transform: translate(-50%, -50%) translateY(-15px) rotate(-180deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          50% { transform: translate(-50%, -50%) translateY(-25px) rotate(90deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          50% { transform: translate(-50%, -50%) translateY(-18px) rotate(-90deg); }
        }
        @keyframes float4 {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          50% { transform: translate(-50%, -50%) translateY(-22px) rotate(270deg); }
        }
        @keyframes float5 {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          50% { transform: translate(-50%, -50%) translateY(-16px) rotate(-270deg); }
        }
        @keyframes colorPulse {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0; transform: scale(1.2); }
        }
        @keyframes floatParticle {
          0% { 
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
            opacity: 0.8;
          }
          100% { 
            transform: translate(-50%, -50%) translateY(-100px) scale(0.5) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes phoenixFadeIn {
          0% { 
            opacity: 0; 
            transform: translateX(-50px);
          }
          100% { 
            opacity: 1; 
            transform: translateX(0);
          }
        }
         @keyframes aiRobotFloat {
           0%, 100% { 
             transform: translateY(0px) scale(1);
           }
           50% { 
             transform: translateY(-20px) scale(1.05);
           }
         }
         @keyframes aiRobotParticle {
           0% { 
             transform: translate(-50%, -50%) scale(0) rotate(0deg);
             opacity: 0;
           }
           20% {
             transform: translate(-50%, -50%) scale(1) rotate(72deg);
             opacity: 1;
           }
           80% {
             transform: translate(-50%, -50%) scale(0.8) rotate(288deg);
             opacity: 0.8;
           }
           100% { 
             transform: translate(-50%, -50%) translateY(-50px) scale(0) rotate(360deg);
             opacity: 0;
           }
         }
      `}</style>
    </div>
  );
}


