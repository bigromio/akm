import React from 'react';

export const CartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const WhatsappIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.78.46 3.45 1.28 4.95L2 22l5.25-1.38c1.45.77 3.06 1.23 4.79 1.23h.01c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zM12.04 20.12h-.01c-1.53 0-3-.39-4.3-1.12L7 18.65l-3.3 1.1.9-3.2c-.8-1.4-1.2-3-1.2-4.65 0-4.5 3.63-8.13 8.13-8.13 4.5 0 8.13 3.63 8.13 8.13 0 4.5-3.64 8.13-8.12 8.13zm4.5-6.23c-.25-.12-1.47-.72-1.7-.8s-.39-.12-.56.12c-.17.25-.64.8-.79 1s-.3.17-.56 0c-.25-.12-1.07-.4-2.04-1.26s-1.47-1.76-1.64-2.06c-.17-.3-.02-.46.1-.6.1-.12.25-.3.37-.45s.17-.25.25-.4c.08-.17.04-.32-.02-.45-.07-.12-.56-1.34-.76-1.84s-.4-.42-.56-.42h-.48c-.17 0-.45.07-.68.32s-.88.85-1.07 2.06c-.2 1.2.9 2.4 1.03 2.56.12.17 1.76 2.67 4.25 3.73.58.25 1.03.4 1.37.5.48.15.9.12 1.23.07.37-.04.42-.1.42-.1.52-.45 1.1-1.34 1.26-1.64.17-.3.17-.56.12-.68l-.4-.2z" />
    </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
);

export const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

export const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

export const MadaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z" fill="#00AEEF"/>
    <path d="M19.011 7H8.98801C7.88901 7 7 7.889 7 8.988V19.011C7 20.111 7.88901 21 8.98801 21H19.011C20.111 21 21 20.111 21 19.011V8.988C21 7.889 20.111 7 19.011 7Z" fill="white"/>
    <path d="M9.83301 16.333L12.666 10.666L15.5 16.333H9.83301Z" fill="#00AEEF"/>
    <path d="M13.889 12.015L15.499 15.222H17.222L14.667 9.83301L13.111 12.944L13.889 12.015Z" fill="#00AEEF"/>
  </svg>
);

export const VisaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
    <path fill="#1A1F71" d="M14,28C21.7,28,28,21.7,28,14S21.7,0,14,0,0,6.3,0,14,6.3,28,14,28Z"/>
    <path fill="#fff" d="M21,12.2l-3.2,7.3h-2.1l3.2-7.3H21z M10,19.5h2.1l1.3-3.1L12.1,12h-2L10,19.5z M6.9,19.5h2l3.2-7.3H9.9C9.4,12.2,7,14,6.9,19.5z M24,19.5h2.1l-2.4-7.3H22L24,19.5z"/>
    <path fill="#F7A600" d="M14.2,9.6c0,0-4.4-0.6-4.4,2.6c0,0-0.4,3.3,3.7,3.3c0.1,0,3-0.1,3-2.6C16.5,10.1,14.2,9.6,14.2,9.6z"/>
  </svg>
);

export const ApplePayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
    <path fill="#000" d="M14,28C21.7,28,28,21.7,28,14S21.7,0,14,0,0,6.3,0,14,6.3,28,14,28Z"/>
    <path fill="#fff" d="M16.9,13.8c0.1-2.2,1.8-3.5,2-3.6c-1-1.5-2.6-1.7-3.1-1.7c-1.3,0-2.5,0.8-3.2,0.8c-0.7,0-1.7-0.8-2.9-0.7c-1.4,0-2.7,0.8-3.4,2.1c-1.5,2.7,0.4,6.6,2,8.8c0.8,1.1,1.7,2.2,2.9,2.1c1.1,0,1.5-0.7,2.8-0.7c1.3,0,1.7,0.7,2.9,0.7c1.2,0,2-0.9,2.8-2c0.5-0.7,0.9-1.4,1.2-2.3C18.6,17.4,16.8,16.2,16.9,13.8z"/>
    <path fill="#fff" d="M15.9,8.5c0.6-0.7,1-1.8,0.9-2.8c-0.8,0-1.9,0.6-2.5,1.3C13.7,7.5,13.2,8.6,13.3,9.5C14.2,9.6,15.2,9.1,15.9,8.5z"/>
  </svg>
);

export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);