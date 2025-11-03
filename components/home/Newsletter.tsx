import React from 'react';
import { Button } from '../common/Button';

interface NewsletterProps {
  onSubscribeClick: () => void;
}

export const Newsletter: React.FC<NewsletterProps> = ({ onSubscribeClick }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubscribeClick();
  };

  return (
    <div className="bg-light-beige py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-dark-text mb-2">اشترك في نشرتنا البريدية</h2>
        <p className="text-gray-600 mb-6">كن أول من يعرف عن عروضنا الحصرية ومنتجاتنا الجديدة!</p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex">
          <input 
            type="email"
            placeholder="ادخل بريدك الإلكتروني"
            className="w-full px-4 py-3 rounded-r-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-pistachio"
            required
          />
          <Button type="submit" className="rounded-l-md rounded-r-none" variant="primary">
            اشتراك
          </Button>
        </form>
      </div>
    </div>
  );
};