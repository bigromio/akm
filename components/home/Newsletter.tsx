import React, { useState } from 'react';
import { Button } from '../common/Button';

const API_URL = 'https://script.google.com/macros/s/AKfycbwqrAu-ujuUySs3_PzS_zE7no6q9i85OCOAKB_qBuIw_58biTw9nDK2oIlnzfFJPEXt/exec';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    fetch(`${API_URL}?action=addSubscriber`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        alert('شكراً لاشتراكك! ستصلك أفضل العروض.');
        setEmail('');
        localStorage.setItem('akm_newsletter_subscribed', 'true');
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
    <div className="bg-light-beige dark:bg-dark-surface py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-dark-text dark:text-dark-text-primary mb-2">اشترك في نشرتنا البريدية</h2>
        <p className="text-gray-600 dark:text-dark-text-secondary mb-6">كن أول من يعرف عن عروضنا الحصرية ومنتجاتنا الجديدة!</p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex">
          <input
            type="email"
            placeholder="ادخل بريدك الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-r-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-dark-text dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-pistachio"
            required
            disabled={isSubmitting}
          />
          <Button type="submit" className="rounded-l-md rounded-r-none" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? '...' : 'اشتراك'}
          </Button>
        </form>
      </div>
    </div>
  );
};
