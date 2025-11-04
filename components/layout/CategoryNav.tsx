import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuIcon, XIcon, ChevronLeftIcon, ChevronRightIcon } from '../icons/Icons';
import { Category } from '../../types';

const API_URL = 'https://script.google.com/macros/s/AKfycbwqrAu-ujuUySs3_PzS_zE7no6q9i85OCOAKB_qBuIw_58biTw9nDK2oIlnzfFJPEXt/exec';

export const CategoryNav: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`${API_URL}?sheet=Categories`)
      .then(res => res.json())
      .then(jsonResponse => {
        if (jsonResponse.status === 'success') {
          setCategories(jsonResponse.data);
        }
      })
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

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
  }, [categories]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const MobileMenu = () => (
    <div className="absolute top-full right-0 w-full bg-pistachio shadow-lg md:hidden">
        {categories.map(category => (
            <NavLink
                key={category.id}
                to={`/products/${category.name}`}
                className={({ isActive }) =>
                    `block text-right px-5 py-3 font-semibold border-b border-light-beige/20 transition-colors duration-200 ${
                    isActive ? 'text-accent-gold' : 'text-light-beige hover:text-white'
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
    <nav className="bg-pistachio sticky top-[80px] z-30">
      <div className="container mx-auto px-4">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center text-light-beige">
          <span className="font-bold">الأقسام</span>
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
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/5 backdrop-blur-sm rounded-full p-1 shadow-md hover:bg-black/10 z-10"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="h-6 w-6 text-light-beige" />
            </button>
          )}
          <div className="flex-grow overflow-hidden">
            <ul ref={scrollContainerRef} className="flex overflow-x-auto custom-scrollbar scroll-smooth" style={{ scrollbarWidth: 'none' }}>
              {categories.map(category => (
                <li key={category.id} className="flex-shrink-0">
                  <NavLink
                    to={`/products/${category.name}`}
                    className={({ isActive }) =>
                      `block whitespace-nowrap px-5 py-3 font-semibold border-b-2 transition-colors duration-200 ${
                        isActive
                          ? 'border-accent-gold text-light-beige'
                          : 'border-transparent text-light-beige/80 hover:text-light-beige hover:border-accent-gold/50'
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
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/5 backdrop-blur-sm rounded-full p-1 shadow-md hover:bg-black/10 z-10"
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="h-6 w-6 text-light-beige" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};