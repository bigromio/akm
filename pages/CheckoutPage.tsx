import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      id={id}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent-gold focus:border-accent-gold"
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
    city: '',
    address: '',
  });

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

    const orderData = {
      customer: formData,
      items: cartItems.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price })),
      total: totalPrice + (totalPrice >= 250 ? 0 : 25),
      timestamp: new Date().toISOString(),
    };

    console.log("Order Submitted:", JSON.stringify(orderData, null, 2));
    alert('تم تأكيد طلبك بنجاح! سيتم التواصل معك قريباً.');
    clearCart();
    navigate('/');
  };

  const shippingCost = totalPrice >= 250 ? 0 : 25;
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="bg-off-white min-h-screen py-12">
      <div className="container mx-auto px-4 fade-in-up">
        <h1 className="text-3xl font-bold text-center mb-8">إتمام الشراء</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">معلومات العميل</h2>
            <div className="space-y-4">
              <FormInput label="الاسم الكامل" id="fullName" type="text" value={formData.fullName} onChange={handleInputChange} required />
              <FormInput label="رقم الجوال" id="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
              <FormInput label="المدينة" id="city" type="text" value={formData.city} onChange={handleInputChange} required />
              <FormInput label="العنوان التفصيلي" id="address" type="text" value={formData.address} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2 mb-4">
                {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                        <span className="flex-1 truncate">{item.name} x{item.quantity}</span>
                        <span className="flex-shrink-0">{(item.price * item.quantity).toFixed(2)} ر.س</span>
                    </div>
                ))}
            </div>
             <div className="space-y-2 mb-4 border-t pt-2">
              <div className="flex justify-between">
                <span>المجموع الفرعي</span>
                <span>{totalPrice.toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span>الشحن</span>
                <span>{shippingCost.toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                <span>الإجمالي</span>
                <span>{finalTotal.toFixed(2)} ر.س</span>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={cartItems.length === 0}>تأكيد الطلب</Button>
          </div>
        </form>
      </div>
    </div>
  );
};