import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

export const GiftSection: React.FC = () => {
  return (
    <div className="relative bg-cover bg-center py-20" style={{ backgroundImage: "url('https://picsum.photos/seed/giftbg/1200/400')" }}>
      <div className="absolute inset-0 bg-pistachio bg-opacity-80"></div>
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">صناديق هدايا فاخرة</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          شارك أحبابك اللحظات السعيدة مع تشكيلتنا المميزة من صناديق الهدايا، المصممة بعناية لتناسب كل المناسبات.
        </p>
        <Link to="/products/الهدايا والمشاركة">
            <Button variant="secondary" size="lg">
                اكتشف الهدايا
            </Button>
        </Link>
      </div>
    </div>
  );
};