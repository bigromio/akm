import React, { useState, useEffect } from 'react';
import { mockPromoVideos } from '../../data/mockData';

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mockPromoVideos.length);
    }, 7000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-80 md:h-[500px] lg:h-[600px] overflow-hidden">
      {mockPromoVideos.map((video, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <video
            src={video}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
      ))}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg mb-4">نكهة الأصالة في كل حبة</h1>
        <p className="text-lg md:text-2xl drop-shadow-md">أجود أنواع القهوة، التمور، والمكسرات تصلك حيثما كنت</p>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 space-x-reverse">
        {mockPromoVideos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-accent-gold' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};
