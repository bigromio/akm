import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';
import { Button } from '../components/common/Button';
import { useCart } from '../contexts/CartContext';
import { ProductCarousel } from '../components/home/ProductCarousel';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === Number(productId));
    setProduct(foundProduct || null);
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return <div className="text-center py-20">المنتج غير موجود. <Link to="/" className="text-pistachio hover:underline">العودة للرئيسية</Link></div>;
  }
  
  const relatedProducts = mockProducts.filter(p => p.category === product.category && p.id !== product.id);

  return (
    <div className="fade-in-up">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg shadow-lg" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-dark-text mb-2">{product.name}</h1>
            <p className="text-lg text-gray-500 mb-4">{product.weight}</p>
            <p className="text-3xl font-bold text-pistachio mb-6">{product.price} <span className="text-lg">ر.س</span></p>
            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <label htmlFor="quantity" className="font-bold">الكمية:</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-xl hover:bg-light-beige rounded-r-md">-</button>
                <input 
                  type="number" 
                  id="quantity" 
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 1)}
                  className="w-16 text-center border-none focus:ring-0 font-bold text-lg" 
                  min="1"
                />
                <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-xl hover:bg-light-beige rounded-l-md">+</button>
              </div>
            </div>

            <Button onClick={() => addToCart(product, quantity)} size="lg" className="w-full">أضف إلى السلة</Button>
          </div>
        </div>
      </div>
      {relatedProducts.length > 0 && (
          <div className="bg-light-beige">
              <ProductCarousel title="العملاء اشتروا أيضًا" products={relatedProducts} />
          </div>
      )}
    </div>
  );
};