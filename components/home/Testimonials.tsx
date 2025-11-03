import React from 'react';

const mockTestimonials = [
  {
    id: 1,
    name: 'عبدالله الراجحي',
    quote: 'جودة التمر والقهوة لا يُعلى عليها. توصيل سريع وخدمة عملاء ممتازة. متجر أكم هو وجهتي الأولى دائماً.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    id: 2,
    name: 'سارة العتيبي',
    quote: 'بكج العيد كان هدية رائعة وفاخرة، كل من استلمها أُعجب بالجودة والتغليف الأنيق. شكراً أكم.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
  },
  {
    id: 3,
    name: 'محمد الغامدي',
    quote: 'المكسرات طازجة ومحمصة بإتقان. طلبت منهم أكثر من مرة ودائماً أحصل على نفس الجودة العالية.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
  },
];

const TestimonialCard: React.FC<{ testimonial: typeof mockTestimonials[0] }> = ({ testimonial }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <img src={testimonial.avatar} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-light-beige" />
    <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
    <h4 className="font-bold text-pistachio">{testimonial.name}</h4>
  </div>
);

export const Testimonials: React.FC = () => {
  return (
    <div className="py-16 bg-off-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-dark-text">ماذا يقول عملاؤنا</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockTestimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};