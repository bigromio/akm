import React, { useState, useEffect } from 'react';
import { HeroSlider } from '../components/home/HeroSlider';
import { ProductCarousel } from '../components/home/ProductCarousel';
import { AboutSnippet } from '../components/home/AboutSnippet';
import { GiftSection } from '../components/home/GiftSection';
import { Testimonials } from '../components/home/Testimonials';
import { Newsletter } from '../components/home/Newsletter';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { Product } from '../types';
import { ProductCardSkeleton } from '../components/common/ProductCardSkeleton';

const API_URL = 'https://script.google.com/macros/s/AKfycbwqrAu-ujuUySs3_PzS_zE7no6q9i85OCOAKB_qBuIw_58biTw9nDK2oIlnzfFJPEXt/exec';

const SubscriptionModalContent: React.FC<{onClose: () => void}> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        fetch(`${API_URL}?action=addSubscriber`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ email: email })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                alert('شكراً لاشتراكك! ستصلك أفضل العروض.');
                localStorage.setItem('akm_newsletter_subscribed', 'true');
                onClose();
            } else {
                alert(`حدث خطأ: ${data.message}`);
            }
            setIsSubmitting(false);
        })
        .catch(error => {
            console.error('Error subscribing:', error);
            alert('حدث خطأ فادح. الرجاء المحاولة مرة أخرى.');
            setIsSubmitting(false);
        });
    };

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-pistachio mb-2">اشترك لتصلك عروض أكم أولاً 🌿</h2>
            <p className="text-dark-text dark:text-dark-text-secondary mb-6">لا تفوت فرصة الحصول على خصومات حصرية على أجود المنتجات.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="بريدك الإلكتروني"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-dark-text dark:text-dark-text-primary rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-pistachio"
                    required
                    disabled={isSubmitting}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'جاري الاشتراك...' : 'اشتراك'}
                </Button>
            </form>
        </div>
    )
}

export const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('akm_newsletter_seen');
    const hasSubscribed = localStorage.getItem('akm_newsletter_subscribed');
    if (!hasSeenModal && !hasSubscribed) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        localStorage.setItem('akm_newsletter_seen', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}?sheet=Products`)
      .then(res => res.json())
      .then(jsonResponse => {
        if (jsonResponse.status === 'success') {
          setAllProducts(jsonResponse.data);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setIsLoading(false);
      });
  }, []);

  const bestSellers = allProducts.filter(p => p.tags.includes('الأكثر مبيعاً')).length > 3
    ? allProducts.filter(p => p.tags.includes('الأكثر مبيعاً'))
    : allProducts.slice(0, 8);

  const specialOffers = allProducts.filter(p => p.tags.includes('عرض')).length > 3
    ? allProducts.filter(p => p.tags.includes('عرض'))
    : allProducts.slice(1, 9);

  const newProducts = allProducts.filter(p => p.tags.includes('جديد')).length > 3
    ? allProducts.filter(p => p.tags.includes('جديد'))
    : allProducts.slice(2, 10);
  
  const CarouselLoader: React.FC<{title: string}> = ({ title }) => (
      <div className="py-12">
        <div className="container mx-auto px-4">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mx-auto mb-8 animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                 {Array.from({ length: 4 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>
        </div>
      </div>
  );

  return (
    <div className="fade-in-up">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <SubscriptionModalContent onClose={() => setIsModalOpen(false)} />
      </Modal>

      <HeroSlider />
      {isLoading ? <CarouselLoader title="الأكثر مبيعًا" /> : (bestSellers.length > 0 && <ProductCarousel title="الأكثر مبيعًا" products={bestSellers} />)}
      
      <div className="bg-light-beige dark:bg-dark-surface">
          {isLoading ? <CarouselLoader title="العروض الخاصة" /> : (specialOffers.length > 0 && <ProductCarousel title="العروض الخاصة" products={specialOffers} />)}
      </div>
      
      <GiftSection />
      <AboutSnippet />
      <Testimonials />
      
      {isLoading ? <CarouselLoader title="جديد أكم" /> : (newProducts.length > 0 && <ProductCarousel title="جديد أكم" products={newProducts} />)}
      
      <Newsletter />
    </div>
  );
};