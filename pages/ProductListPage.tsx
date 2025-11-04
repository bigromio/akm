import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/common/ProductCard';
import { Product } from '../types';
import { ProductCardSkeleton } from '../components/common/ProductCardSkeleton';

const API_URL = 'https://script.google.com/macros/s/AKfycbwqrAu-ujuUySs3_PzS_zE7no6q9i85OCOAKB_qBuIw_58biTw9nDK2oIlnzfFJPEXt/exec';

export const ProductListPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState('جميع المنتجات');

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    fetch(`${API_URL}?sheet=Products`)
      .then(res => res.json())
      .then(jsonResponse => {
        if (jsonResponse.status === 'success') {
          const allProducts = jsonResponse.data;
          if (categoryName) {
            setProducts(allProducts.filter(p => p.category === categoryName));
            setPageTitle(categoryName);
          } else {
            setProducts(allProducts);
            setPageTitle('جميع المنتجات');
          }
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setIsLoading(false);
      });
  }, [categoryName]);

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mx-auto mb-8 animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 fade-in-up">
      <h1 className="text-3xl font-bold mb-8 text-center text-dark-text dark:text-dark-text-primary">{pageTitle}</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-dark-text-secondary">لا توجد منتجات في هذا القسم حاليًا.</p>
      )}
    </div>
  );
};