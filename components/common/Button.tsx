import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', size = 'md', ...props }) => {
  const baseStyles = 'rounded-md font-bold transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-pistachio text-white hover:bg-opacity-90 focus:ring-pistachio',
    secondary: 'bg-accent-gold text-white hover:bg-opacity-90 focus:ring-accent-gold',
    outline: 'bg-transparent border-2 border-pistachio text-pistachio hover:bg-pistachio hover:text-white focus:ring-pistachio'
  };

  const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-2.5',
      lg: 'px-8 py-3 text-lg'
  }

  return (
    <button className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};