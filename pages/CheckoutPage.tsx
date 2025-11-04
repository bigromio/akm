import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://script.google.com/macros/s/AKfycbwqrAu-ujuUySs3_PzS_zE7no6q9i85OCOAKB_qBuIw_58biTw9nDK2oIlnzfFJPEXt/exec';

const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">{label}</label>
    <input
      id={id}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-dark-text dark:text-dark-text-primary rounded-md shadow-sm focus:outline-none focus:ring-accent-gold focus:border-accent-gold"
      {...props}
    />
  </div>
);

export const CheckoutPage: React.FC = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
        alert('سلتك فارغة!');
        navigate('/');
        return;
    }
    if (Object.values(formData).some(val => val === '')) {
      alert('الرجاء تعبئة جميع الحقول');
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}`,
      items: cartItems.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price })),
      total: totalPrice + (totalPrice >= 250 ? 0 : 25),
    };

    fetch(`${API_URL}?action=addOrder`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        alert('تم تأكيد طلبك بنجاح! سيتم التواصل معك قريباً.');
        clearCart();
        navigate('/');
      } else {
        alert('حدث خطأ: ' + data.message);
      }
      setIsSubmitting(false);
    })
    .catch(error => {
      console.error('Error submitting order:', error);
      alert('حدث خطأ فادح. الرجاء المحاولة مرة أخرى.');
      setIsSubmitting(false);
    });
  };

  const shippingCost = totalPrice >= 250 ? 0 : 25;
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="bg-off-white dark:bg-dark-bg min-h-screen py-12">
      <div className="container mx-auto px-4 fade-in-up">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-dark-text-primary">إتمام الشراء</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md dark:shadow-none">
            <h2 className="text-xl font-bold mb-4 dark:text-dark-text-primary">معلومات العميل</h2>
            <div className="space-y-4">
              <FormInput label="الاسم الكامل" id="fullName" type="text" value={formData.fullName} onChange={handleInputChange} required />
              <FormInput label="رقم الجوال" id="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
              <FormInput label="البريد الإلكتروني" id="email" type="email" value={formData.email} onChange={handleInputChange} required />
              <FormInput label="المدينة" id="city" type="text" value={formData.city} onChange={handleInputChange} required />
              <FormInput label="العنوان التفصيلي" id="address" type="text" value={formData.address} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md dark:shadow-none h-fit">
            <h2 className="text-xl font-bold mb-4 dark:text-dark-text-primary">ملخص الطلب</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2 mb-4 text-dark-text dark:text-dark-text-secondary">
                {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                        <span className="flex-1 truncate">{item.name} x{item.quantity}</span>
                        <span className="flex-shrink-0">{(item.price * item.quantity).toFixed(2)} ر.س</span>
                    </div>
                ))}
            </div>
             <div className="space-y-2 mb-4 border-t dark:border-gray-700 pt-2 text-dark-text dark:text-dark-text-secondary">
              <div className="flex justify-between">
                <span>المجموع الفرعي</span>
                <span>{totalPrice.toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span>الشحن</span>
                <span>{shippingCost > 0 ? shippingCost.toFixed(2) + ' ر.س' : 'مجاني'}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t dark:border-gray-700 mt-2 text-dark-text dark:text-dark-text-primary">
                <span>الإجمالي</span>
                <span>{finalTotal.toFixed(2)} ر.س</span>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={cartItems.length === 0 || isSubmitting}>
              {isSubmitting ? 'جاري التأكيد...' : 'تأكيد الطلب'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};