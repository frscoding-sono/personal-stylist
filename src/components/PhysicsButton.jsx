import React from 'react';
import { motion } from 'framer-motion';

/**
 * PhysicsButton - 3D 물리적 버튼 컴포넌트
 *
 * @param {string} variant - 'primary' | 'secondary' | 'dark' | 'gradient'
 * @param {number} depth - 그림자 깊이 (기본값: 8)
 * @param {function} onClick - 클릭 핸들러
 * @param {boolean} disabled - 비활성화 상태
 * @param {string} className - 추가 클래스
 */
const PhysicsButton = ({
  children,
  onClick,
  variant = 'dark',
  depth = 8,
  disabled = false,
  className = '',
  icon,
  ...props
}) => {

  const variants = {
    dark: {
      bg: 'bg-black',
      text: 'text-white',
      shadow: '#333',
    },
    primary: {
      bg: 'bg-orange-500',
      text: 'text-white',
      shadow: '#c2410c',
    },
    gradient: {
      bg: 'bg-gradient-to-r from-orange-500 to-orange-400',
      text: 'text-white',
      shadow: '#c2410c',
    },
    secondary: {
      bg: 'bg-white',
      text: 'text-orange-600',
      shadow: '#d1d5db',
    },
    blue: {
      bg: 'bg-orange-600',
      text: 'text-white',
      shadow: '#9a3412',
    },
    success: {
      bg: 'bg-orange-500',
      text: 'text-white',
      shadow: '#c2410c',
    },
    orange: {
      bg: 'bg-gradient-to-r from-orange-600 to-orange-500',
      text: 'text-white',
      shadow: '#9a3412',
    },
  };

  const style = variants[variant] || variants.dark;

  return (
    <motion.button
      whileTap={{ y: depth, scale: 0.98 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        w-full py-5 rounded-full font-bold text-xs tracking-widest uppercase
        transition-all duration-100 ease-out
        flex items-center justify-center gap-3
        ${style.bg} ${style.text}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:translate-y-2'}
        ${className}
      `}
      style={{
        boxShadow: disabled ? 'none' : `0 ${depth}px 0 0 ${style.shadow}`,
      }}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default PhysicsButton;
