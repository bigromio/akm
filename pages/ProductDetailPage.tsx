import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { Button } from '../components/common/Button';
import { useCart } from '../contexts/CartContext';
import { ProductCarousel } from '../components/home/ProductCarousel';

const API_URL = 'https://script.google.com/macros/s/AKfycbwqrAu-ujuUySs3_PzS_zE7no6q9i85OCOAKB_qBuIw_58biTw9nDK2oIlnzfFJPEXt/exec';


export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);

    fetch(`${API_URL}?sheet=Products`)
      .then(res => res.json())
      .then(jsonResponse => {
        if (jsonResponse.status === 'success') {
          const allProducts: Product[] = jsonResponse.data;
          const foundProduct = allProducts.find(p => p.id === Number(productId));
          setProduct(foundProduct || null);
          if (foundProduct) {
              setRelatedProducts(allProducts.filter(p => p.category === foundProduct.category && p.id !== foundProduct.id));
          }
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product details:", err);
        setIsLoading(false);
      });
  }, [productId]);
  
  if (isLoading) {
    return <div className="text-center py-20 dark:text-dark-text-secondary">جاري تحميل المنتج...</div>;
  }

  if (!product) {
    return <div className="text-center py-20 dark:text-dark-text-secondary">المنتج غير موجود. <Link to="/" className="text-pistachio hover:underline">العودة للرئيسية</Link></div>;
  }

  return (
    <div className="fade-in-up">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg shadow-lg" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-dark-text dark:text-dark-text-primary mb-2">{product.name}</h1>
            <p className="text-lg text-gray-500 dark:text-dark-text-secondary mb-4">{product.weight}</p>
            <p className="text-3xl font-bold text-pistachio mb-6">{product.price} <span className="text-lg">ر.س</span></p>
            <p className="text-gray-700 dark:text-dark-text-secondary leading-relaxed mb-6">{product.description}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <label htmlFor="quantity" className="font-bold dark:text-dark-text-primary">الكمية:</label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-surface">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-xl hover:bg-light-beige dark:hover:bg-gray-700 rounded-r-md dark:text-dark-text-primary">-</button>
                <input 
                  type="number" 
                  id="quantity" 
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 1)}
                  className="w-16 text-center border-none focus:ring-0 font-bold text-lg bg-transparent text-dark-text dark:text-dark-text-primary" 
                  min="1"
                />
                <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-xl hover:bg-light-beige dark:hover:bg-gray-700 rounded-l-md dark:text-dark-text-primary">+</button>
              </div>
            </div>

            <Button onClick={() => addToCart(product, quantity)} size="lg" className="w-full">أضف إلى السلة</Button>
          </div>
        </div>
      </div>
      {relatedProducts.length > 0 && (
          <div className="bg-light-beige dark:bg-dark-surface">
              <ProductCarousel title="العملاء اشتروا أيضًا" products={relatedProducts} />
          </div>
      )}
    </div>
  );
};
