import React, { useRef, useState, useEffect } from 'react';
import { Product } from '../../types';
import { ProductCard } from '../common/ProductCard';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/Icons';

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth -1);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      checkScrollability();
      el.addEventListener('scroll', checkScrollability, { passive: true });
      window.addEventListener('resize', checkScrollability);
      
      return () => {
        el.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [products]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = (scrollContainerRef.current.clientWidth / 2) * (direction === 'left' ? -1 : 1);
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-dark-text dark:text-dark-text-primary">{title}</h2>
        <div className="relative">
          {canScrollLeft && (
            <button 
              onClick={() => handleScroll('left')} 
              className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-dark-surface rounded-full p-2 shadow-lg hover:bg-light-beige dark:hover:bg-gray-700 z-10 hidden md:flex"
              aria-label="Previous products"
            >
              <ChevronLeftIcon className="h-6 w-6 text-dark-text dark:text-dark-text-primary" />
            </button>
          )}
          <div ref={scrollContainerRef} className="flex overflow-x-auto gap-6 pb-4 custom-scrollbar snap-x snap-mandatory">
            {products.map(product => (
              <div key={product.id} className="snap-start flex-shrink-0 w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {canScrollRight && (
             <button 
              onClick={() => handleScroll('right')} 
              className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-dark-surface rounded-full p-2 shadow-lg hover:bg-light-beige dark:hover:bg-gray-700 z-10 hidden md:flex"
              aria-label="Next products"
            >
              <ChevronRightIcon className="h-6 w-6 text-dark-text dark:text-dark-text-primary" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};