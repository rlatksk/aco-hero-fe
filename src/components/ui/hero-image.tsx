'use client';

import Image from 'next/image';
import { useState } from 'react';

interface HeroImageProps {
  heroName: string;
  localizedName: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export function HeroImage({ 
  heroName, 
  localizedName, 
  className = '',
  priority = false,
  width = 128,
  height = 72
}: HeroImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    // Fallback placeholder when image fails to load
    return (
      <div className={`bg-[#21262d] flex items-center justify-center ${className}`}>
        <span className="text-xs text-[#8b949e]">N/A</span>
      </div>
    );
  }

  return (
    <Image
      src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`}
      alt={localizedName}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      priority={priority}
      onError={() => setError(true)}
      unoptimized // External CDN is already optimized
    />
  );
}
