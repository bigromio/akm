import React from 'react';
import { Link } from 'react-router-dom';
import { CartIcon, UserIcon, SearchIcon } from '../icons/Icons';
import { useCart } from '../../contexts/CartContext';

const AkmLogo = () => (
  <Link to="/" className="text-3xl font-bold text-pistachio">
    أكم
    <span className="text-accent-gold">.</span>
  </Link>
);

const SearchBar: React.FC = () => {
    return (
        <div className="relative flex-grow max-w-lg hidden md:block">
            <input
                type="text"
                placeholder="ابحث عن قهوة, تمور, مكسرات..."
                className="w-full px-4 py-2 pr-10 border border-light-beige rounded-full focus:outline-none focus:ring-2 focus:ring-accent-gold"
            />
            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
    );
};

export const Header: React.FC = () => {
  const { cartCount } = useCart();

  return (
    <header className="bg-off-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <AkmLogo />
        <SearchBar />
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-light-beige md:hidden">
            <SearchIcon className="h-6 w-6 text-dark-text"/>
          </button>
          <button className="p-2 rounded-full hover:bg-light-beige">
            <UserIcon className="h-6 w-6 text-dark-text" />
          </button>
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-light-beige">
            <CartIcon className="h-6 w-6 text-dark-text" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center h-5 w-5 bg-accent-gold text-white text-xs rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};