import React from 'react';

export const AboutSnippet: React.FC = () => {
  return (
    <div className="bg-light-beige dark:bg-dark-surface py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-pistachio mb-4">عن أكم</h2>
        <p className="max-w-3xl mx-auto text-lg text-dark-text dark:text-dark-text-secondary leading-relaxed">
          "من نكهة الأصالة... نُقدّم لك الأفضل. قهوتنا، سُكّر تمرنا، ومكسراتنا من أجود المزارع السعودية والعالمية، نختارها بعناية لتصلك بأعلى جودة."
        </p>
      </div>
    </div>
  );
};