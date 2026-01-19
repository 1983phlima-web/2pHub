
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-150 animate-pulse"></div>
      
      <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 w-full h-full drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
        <defs>
          <linearGradient id="metalBlue" x1="0" y1="0" x2="100" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00E0FF" />
            <stop offset="40%" stopColor="#0075FF" />
            <stop offset="100%" stopColor="#0038FF" />
          </linearGradient>
          <radialGradient id="sunBurst" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* The "2P" stylized structure */}
        <path 
          d="M10 60 L30 20 L55 20 L45 35 L65 35 L55 60 Z" 
          fill="url(#metalBlue)" 
          stroke="white" 
          strokeWidth="0.5" 
          strokeOpacity="0.3"
        />
        
        {/* Stylized "2" portion */}
        <path 
          d="M5 55 Q 15 15, 50 15 L55 25 Q 25 25, 20 55 Z" 
          fill="white" 
          fillOpacity="0.1"
        />

        {/* The "P" arc */}
        <path 
          d="M60 20 Q 95 20, 95 40 Q 95 60, 60 60 L50 60 L60 45 L70 45 Q 80 45, 80 40 Q 80 35, 70 35 L60 35 Z" 
          fill="url(#metalBlue)"
        />

        {/* Central Sunburst/Star effect as seen in the logo */}
        <circle cx="50" cy="40" r="12" fill="url(#sunBurst)" fillOpacity="0.8" />
        <path d="M50 25 L50 55 M35 40 L65 40" stroke="white" strokeWidth="1" strokeLinecap="round" />
        
        {/* Subtle highlights */}
        <path d="M15 50 L25 30" stroke="white" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default Logo;
