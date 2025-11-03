import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/common/Button';

export const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, cartCount } = useCart();
  const shippingCost = totalPrice >= 250 ? 0 : 25;
  const finalTotal = totalPrice + shippingCost;

  if (cartCount === 0) {
    return (
      <div className="container mx-auto text-center py-20 px-4 fade-in-up">
        <h1 className="text-3xl font-bold mb-4">سلة المشتريات فارغة</h1>
        <p className="text-gray-600 mb-8">لم تقم بإضافة أي منتجات إلى السلة بعد.</p>
        <Link to="/">
          <Button>
            ابدأ التسوق
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-off-white min-h-screen py-12">
      <div className="container mx-auto px-4 fade-in-up">
        <h1 className="text-3xl font-bold text-center mb-8">سلة المشتريات</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                <div className="flex items-center gap-4">
                  <Link to={`/product/${item.id}`}>
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  </Link>
                  <div>
                    <Link to={`/product/${item.id}`} className="font-bold hover:text-pistachio">{item.name}</Link>
                    <p className="text-sm text-gray-500">{item.price} ر.س</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                     <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-md">-</button>
                     <input type="text" value={item.quantity} readOnly className="w-10 text-center border-none focus:ring-0" />
                     <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-md">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">ملخص الطلب</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>المجموع الفرعي</span>
                <span>{totalPrice.toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span>الشحن</span>
                <span>{shippingCost === 0 ? 'مجاني' : `${shippingCost.toFixed(2)} ر.س`}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                <span>الإجمالي</span>
                <span>{finalTotal.toFixed(2)} ر.س</span>
              </div>
            </div>
            <Link to="/checkout" className="block w-full">
              <Button className="w-full">
                إتمام الشراء
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};