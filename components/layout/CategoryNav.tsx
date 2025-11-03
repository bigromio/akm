import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { mockCategories } from '../../data/mockData';
import { MenuIcon, XIcon, ChevronLeftIcon, ChevronRightIcon } from '../icons/Icons';

export const CategoryNav: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      checkScrollability();
      el.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      
      return () => {
        el.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const MobileMenu = () => (
    <div className="absolute top-full right-0 w-full bg-white dark:bg-dark-surface shadow-lg md:hidden">
        {mockCategories.map(category => (
            <NavLink
                key={category.id}
                to={`/products/${category.name}`}
                className={({ isActive }) =>
                    `block text-right px-5 py-3 font-semibold border-b dark:border-gray-700 transition-colors duration-200 ${
                    isActive ? 'text-pistachio' : 'text-dark-text dark:text-dark-text-primary hover:bg-light-beige dark:hover:bg-gray-700'
                    }`
                }
                onClick={() => setMobileMenuOpen(false)}
            >
                {category.name}
            </NavLink>
        ))}
    </div>
  );

  return (
    <nav className="bg-white dark:bg-dark-surface border-b border-light-beige dark:border-gray-800 sticky top-[80px] z-30">
      <div className="container mx-auto px-4">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center text-dark-text dark:text-dark-text-primary">
          <span className="font-bold text-pistachio">الأقسام</span>
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
            {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
        {isMobileMenuOpen && <MobileMenu />}

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center relative">
          {canScrollLeft && (
            <button 
              onClick={() => handleScroll('left')} 
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-dark-surface/70 backdrop-blur-sm rounded-full p-1 shadow-md hover:bg-light-beige dark:hover:bg-gray-700 z-10"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="h-6 w-6 text-dark-text dark:text-dark-text-primary" />
            </button>
          )}
          <div className="flex-grow overflow-hidden">
            <ul ref={scrollContainerRef} className="flex overflow-x-auto custom-scrollbar scroll-smooth" style={{ scrollbarWidth: 'none' }}>
              {mockCategories.map(category => (
                <li key={category.id} className="flex-shrink-0">
                  <NavLink
                    to={`/products/${category.name}`}
                    className={({ isActive }) =>
                      `block whitespace-nowrap px-5 py-3 font-semibold border-b-2 transition-colors duration-200 ${
                        isActive
                          ? 'border-pistachio text-pistachio'
                          : 'border-transparent text-dark-text dark:text-dark-text-secondary hover:text-pistachio dark:hover:text-pistachio hover:border-accent-gold'
                      }`
                    }
                  >
                    {category.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {canScrollRight && (
            <button 
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-dark-surface/70 backdrop-blur-sm rounded-full p-1 shadow-md hover:bg-light-beige dark:hover:bg-gray-700 z-10"
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="h-6 w-6 text-dark-text dark:text-dark-text-primary" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};