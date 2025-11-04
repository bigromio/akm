import React, { useState, useEffect } from 'react';

// هذا هو رابط الـ API من متغيرات البيئة
const API_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 1. غيرنا الاسم إلى "صور" ليكون أوضح
  const [promoImages, setPromoImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // جلب البيانات عند تحميل المكون
  useEffect(() => {
    if (!API_URL) {
      console.error("API URL is not defined!");
      setIsLoading(false);
      return;
    }

    // جلب البيانات من الشيت
    fetch(`${API_URL}?sheet=PromoMedia`)
      .then(res => res.json())
      .then(jsonResponse => {
        if (jsonResponse.status === 'success' && jsonResponse.data.length > 0) {
          // 2. نقرأ من العامود "imageUrl" الذي حددناه
          const urls = jsonResponse.data.map((item: any) => item.imageUrl);
          setPromoImages(urls);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching promo media:", err);
        setIsLoading(false);
      });
  }, []); // سيتم تشغيله مرة واحدة

  // تحديث مؤقت الـ Slider
  useEffect(() => {
    if (promoImages.length === 0) return; // لا تقم بتشغيل المؤقت إذا لم تكن هناك صور

    const timer = setTimeout(() => {
      // 3. استخدام promoImages
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promoImages.length);
    }, 5000); // (يمكنك تغيير هذا الرقم إلى 7000 إذا أردت)
    
    return () => clearTimeout(timer);
  }, [currentIndex, promoImages.length]);

  // شاشة تحميل
  if (isLoading) {
    return <div className="relative w-full h-80 md:h-[500px] lg:h-[600px] bg-light-beige dark:bg-dark-surface flex justify-center items-center">
        <span className="dark:text-dark-text-secondary">جاري تحميل العروض...</span>
    </div>;
  }

  // إذا كان الجدول فارغاً
  if (promoImages.length === 0) {
    return null; 
  }

  return (
    <div className="relative w-full h-80 md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* 4. استخدام promoImages */}
      {promoImages.map((imageUrl, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* 5. العودة لاستخدام وسم <img> بدلاً من <video> */}
          <img
            src={imageUrl} // <-- استخدام رابط الصورة الحي
            alt={`Promo banner ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
      ))}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg mb-4">نكهة الأصالة في كل حبة</h1>
        <p className="text-lg md:text-2xl drop-shadow-md">أجود أنواع القهوة، التمور، والمكسرات تصلك حيثما كنت</p>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 space-x-reverse">
        {/* 6. استخدام promoImages */}
        {promoImages.map((_, index) => (
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