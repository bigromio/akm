import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/common/ProductCard';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';

export const ProductListPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [pageTitle, setPageTitle] = useState('جميع المنتجات');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (categoryName) {
      setFilteredProducts(mockProducts.filter(p => p.category === categoryName));
      setPageTitle(categoryName);
    } else {
      setFilteredProducts(mockProducts);
      setPageTitle('جميع المنتجات');
    }
  }, [categoryName]);

  return (
    <div className="container mx-auto px-4 py-8 fade-in-up">
      <h1 className="text-3xl font-bold mb-8 text-center text-dark-text">{pageTitle}</h1>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">لا توجد منتجات في هذا القسم حاليًا.</p>
      )}
    </div>
  );
};