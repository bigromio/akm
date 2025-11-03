import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group flex flex-col">
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-dark-text h-14">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1">{product.weight}</p>
        <div className="mt-auto pt-4 flex justify-between items-center">
          <p className="text-xl font-bold text-pistachio">{product.price} <span className="text-sm">ر.س</span></p>
          <Button onClick={() => addToCart(product, 1)} variant="secondary" size="sm">
            أضف للسلة
          </Button>
        </div>
      </div>
    </div>
  );
};