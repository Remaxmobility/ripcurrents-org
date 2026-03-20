'use client'

// Animated show-opening spotlights — pure CSS, GPU composited
export default function ComedySpotlights() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Spotlight 1 — sweeps left */}
      <div
        className="absolute"
        style={{
          top: '-20%',
          left: '15%',
          width: '3px',
          height: '110vh',
          background: 'linear-gradient(180deg, rgba(255,220,80,0.9) 0%, rgba(255,200,50,0.3) 40%, transparent 80%)',
          transformOrigin: '50% 0%',
          boxShadow: '0 0 40px 20px rgba(255,200,50,0.15)',
          animation: 'spotlight1 6s ease-in-out infinite',
          filter: 'blur(2px)',
        }}
      />
      {/* Spotlight 2 — sweeps right */}
      <div
        className="absolute"
        style={{
          top: '-20%',
          left: '40%',
          width: '3px',
          height: '110vh',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 40%, transparent 75%)',
          transformOrigin: '50% 0%',
          boxShadow: '0 0 40px 20px rgba(255,255,255,0.1)',
          animation: 'spotlight2 7s ease-in-out infinite',
          filter: 'blur(2px)',
        }}
      />
      {/* Spotlight 3 — center slow sweep */}
      <div
        className="absolute"
        style={{
          top: '-20%',
          left: '65%',
          width: '3px',
          height: '110vh',
          background: 'linear-gradient(180deg, rgba(255,140,0,0.85) 0%, rgba(255,100,0,0.25) 40%, transparent 75%)',
          transformOrigin: '50% 0%',
          boxShadow: '0 0 40px 20px rgba(255,120,0,0.12)',
          animation: 'spotlight3 9s ease-in-out infinite',
          filter: 'blur(2px)',
        }}
      />
      {/* Spotlight 4 — fast right */}
      <div
        className="absolute"
        style={{
          top: '-20%',
          left: '82%',
          width: '2px',
          height: '110vh',
          background: 'linear-gradient(180deg, rgba(200,180,255,0.7) 0%, rgba(180,150,255,0.15) 40%, transparent 70%)',
          transformOrigin: '50% 0%',
          animation: 'spotlight4 5s ease-in-out infinite',
          filter: 'blur(1.5px)',
        }}
      />

      {/* Stage floor glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: 'radial-gradient(ellipse 70% 100% at 50% 100%, rgba(160,10,10,0.3) 0%, transparent 70%)',
        }}
      />

      <style>{`
        @keyframes spotlight1 {
          0%, 100% { transform: rotate(-25deg); opacity: 0.9; }
          50%       { transform: rotate(15deg);  opacity: 0.6; }
        }
        @keyframes spotlight2 {
          0%, 100% { transform: rotate(20deg);  opacity: 0.85; }
          50%       { transform: rotate(-18deg); opacity: 0.5; }
        }
        @keyframes spotlight3 {
          0%, 100% { transform: rotate(-10deg); opacity: 0.8; }
          33%       { transform: rotate(25deg);  opacity: 0.9; }
          66%       { transform: rotate(-20deg); opacity: 0.5; }
        }
        @keyframes spotlight4 {
          0%, 100% { transform: rotate(30deg);  opacity: 0.7; }
          50%       { transform: rotate(-30deg); opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes spotlight1 { 0%, 100% { transform: rotate(-20deg); } }
          @keyframes spotlight2 { 0%, 100% { transform: rotate(15deg);  } }
          @keyframes spotlight3 { 0%, 100% { transform: rotate(-10deg); } }
          @keyframes spotlight4 { 0%, 100% { transform: rotate(25deg);  } }
        }
      `}</style>
    </div>
  )
}
