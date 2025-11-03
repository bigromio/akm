import React from 'react';
import { WhatsappIcon } from '../icons/Icons';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-light-beige text-dark-text text-sm">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <WhatsappIcon className="h-4 w-4 text-pistachio"/>
          <a href="https://wa.me/966000000000" target="_blank" rel="noopener noreferrer" className="hover:underline">
            واتساب مباشر
          </a>
        </div>
        <div>
          <p>شحن مجاني للطلبات فوق 250 ر.س</p>
        </div>
      </div>
    </div>
  );
};