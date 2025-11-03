import React from 'react';
import { WhatsappIcon, InstagramIcon, MadaIcon, VisaIcon, ApplePayIcon } from '../icons/Icons';

export const Footer: React.FC = () => {
  const socialIcons = [
    { name: 'Whatsapp', icon: <WhatsappIcon className="w-6 h-6"/>, link: '#' },
    { name: 'Instagram', icon: <InstagramIcon className="w-6 h-6"/>, link: '#' },
  ];
  
  return (
    <footer className="bg-light-beige pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-dark-text">
          <div>
            <h3 className="text-2xl font-bold text-pistachio mb-4">أكم<span className="text-accent-gold">.</span></h3>
            <p>من نكهة الأصالة... نُقدّم لك الأفضل.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-pistachio">عن المتجر</a></li>
              <li className="mb-2"><a href="#" className="hover:text-pistachio">سياسة الخصوصية</a></li>
              <li className="mb-2"><a href="#" className="hover:text-pistachio">الشحن والإرجاع</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">تواصل معنا</h4>
            <div className="flex space-x-4 space-x-reverse">
              {socialIcons.map(social => (
                <a key={social.name} href={social.link} className="text-dark-text hover:text-pistachio">{social.icon}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">وسائل الدفع المعتمدة</h4>
            <div className="flex items-center space-x-2 space-x-reverse">
                <MadaIcon className="h-8 w-8" />
                <VisaIcon className="h-8 w-8" />
                <ApplePayIcon className="h-8 w-8" />
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600 border-t border-accent-gold pt-6">
          <p>&copy; {new Date().getFullYear()} متجر أكم. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};