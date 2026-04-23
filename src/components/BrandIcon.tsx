import React from 'react';
import { Flame, Snowflake } from 'lucide-react';
import { cn } from '../lib/utils';

interface BrandIconProps {
  size?: number;
  className?: string;
}

export default function BrandIcon({ size, className }: BrandIconProps) {
  const flameGradientId = "flame-gradient";
  const snowflakeGradientId = "snowflake-gradient";

  return (
    <div 
      className={cn("relative flex items-center justify-center shrink-0", className)}
      style={!className?.includes('size-') && !className?.includes('w-') ? { width: size || 32, height: size || 32 } : undefined}
    >
      {/* SVG Definitions for Gradients */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={flameGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} /> {/* Gold/Yellow */}
            <stop offset="50%" style={{ stopColor: '#FF8C00', stopOpacity: 1 }} /> {/* Dark Orange */}
            <stop offset="100%" style={{ stopColor: '#FF4500', stopOpacity: 1 }} /> {/* Orange Red */}
          </linearGradient>
          
          <radialGradient id={snowflakeGradientId} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: '#E0F7FA', stopOpacity: 1 }} /> {/* Very Light Cyan */}
            <stop offset="100%" style={{ stopColor: '#00B0FF', stopOpacity: 1 }} /> {/* Vivid Blue */}
          </radialGradient>
        </defs>
      </svg>

      {/* Left side: Flame */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ clipPath: 'inset(0 50% 0 0)' }}
      >
        <Flame 
          className="w-full h-full"
          stroke={`url(#${flameGradientId})`}
          fill={`url(#${flameGradientId})`}
          strokeWidth={1.5}
        />
      </div>

      {/* Right side: Snowflake */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ clipPath: 'inset(0 0 0 50%)' }}
      >
        <Snowflake 
          className="w-full h-full"
          stroke={`url(#${snowflakeGradientId})`}
          strokeWidth={2.5}
        />
      </div>

      {/* Divider Line */}
      <div className="absolute inset-y-1 left-1/2 w-[1px] bg-white/10 z-10" />
    </div>
  );
}
