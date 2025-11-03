import React, { useState, useEffect } from 'react';
import { HeroSlider } from '../components/home/HeroSlider';
import { ProductCarousel } from '../components/home/ProductCarousel';
import { AboutSnippet } from '../components/home/AboutSnippet';
import { GiftSection } from '../components/home/GiftSection';
import { Testimonials } from '../components/home/Testimonials';
import { Newsletter } from '../components/home/Newsletter';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { mockProducts } from '../data/mockData';

const SubscriptionModalContent: React.FC<{onClose: () => void}> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Subscribed with:", email);
        // Here you would typically send the email to your backend
        localStorage.setItem('akm_newsletter_subscribed', 'true');
        onClose();
    };

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-pistachio mb-2">اشترك لتصلك عروض أكم أولاً 🌿</h2>
            <p className="text-dark-text mb-6">لا تفوت فرصة الحصول على خصومات حصرية على أجود المنتجات.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="بريدك الإلكتروني"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-pistachio"
                    required
                />
                <Button type="submit" className="w-full">
                    اشتراك
                </Button>
            </form>
        </div>
    )
}

export const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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


  const bestSellers = mockProducts.filter(p => p.tags.includes('الأكثر مبيعاً')).length > 3
    ? mockProducts.filter(p => p.tags.includes('الأكثر مبيعاً'))
    : mockProducts.slice(0, 8);

  const specialOffers = mockProducts.filter(p => p.tags.includes('عرض')).length > 3
    ? mockProducts.filter(p => p.tags.includes('عرض'))
    : mockProducts.slice(1, 9);

  const newProducts = mockProducts.filter(p => p.tags.includes('جديد')).length > 3
    ? mockProducts.filter(p => p.tags.includes('جديد'))
    : mockProducts.slice(2, 10);

  return (
    <div className="fade-in-up">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <SubscriptionModalContent onClose={() => setIsModalOpen(false)} />
      </Modal>

      <HeroSlider />
      <ProductCarousel title="الأكثر مبيعًا" products={bestSellers} />
      <div className="bg-light-beige">
          <ProductCarousel title="العروض الخاصة" products={specialOffers} />
      </div>
      <GiftSection />
      <AboutSnippet />
      <Testimonials />
      <ProductCarousel title="جديد أكم" products={newProducts} />
      <Newsletter onSubscribeClick={() => setIsModalOpen(true)} />
    </div>
  );
};