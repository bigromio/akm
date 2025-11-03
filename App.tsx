import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';

import { TopBar } from './components/layout/TopBar';
import { Header } from './components/layout/Header';
import { CategoryNav } from './components/layout/CategoryNav';
import { Footer } from './components/layout/Footer';

import { HomePage } from './pages/HomePage';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen bg-off-white dark:bg-dark-bg font-cairo text-dark-text dark:text-dark-text-primary">
            <TopBar />
            <Header />
            <CategoryNav />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/products/:categoryName" element={<ProductListPage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;