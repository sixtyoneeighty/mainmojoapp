import React from 'react';

interface LogoProps {
  size?: 'small' | 'large';
}

export default function Logo({ size = 'small' }: LogoProps) {
  const sizeClass = size === 'large' 
    ? 'max-h-[16rem] md:h-[16rem]' 
    : 'max-h-12 md:h-12';
  const imageUrl = size === 'large' 
    ? "https://i.imgur.com/ZY3DsqE.png"
    : "https://i.imgur.com/o3HB6wY.png";
  
  return (
    <img 
      src={imageUrl}
      alt="Dr. Mojo Logo" 
      className={`${sizeClass} w-auto object-contain`}
    /> 
  );
}