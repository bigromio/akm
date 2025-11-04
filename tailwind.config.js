/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        /*          * الوضع الفاتح (Light Mode):
         * الخلفية: بيج فاتح (off-white / light-beige)
         * النصوص: بني داكن (dark-text)
         * الألوان المميزة: الأخضر الزيتوني (pistachio) والذهبي (accent-gold)
        */
        'pistachio': '#5A633F',    // <-- غيرناه للأخضر الزيتوني الفاخر
        'accent-gold': '#C09A52',
        'light-beige': '#EAE3D3',
        'off-white': '#F9F9F7',
        'dark-text': '#3A3A3A',
        
        /*          * الوضع الداكن (Dark Mode):
         * الخلفية: بني اسبريسو داكن جداً (dark-bg)
         * خلفية الكروت: بني شوكولاتة (dark-surface)
         * النصوص: بيج فاتح (سكري) لتباين عالي (dark-text-primary/secondary)
         * الألوان المميزة (ستبقى واضحة): الأخضر الزيتوني والذهبي
        */
        'dark-bg': '#2B1D0E',           // بني اسبريسو داكن
        'dark-surface': '#453526',     // بني شوكولاتة
        'dark-text-primary': '#F3E4D2', // بيج فاتح (نص أساسي)
        'dark-text-secondary': '#A8998A',// بني فاتح (نص فرعي)
      },
      fontFamily: {
        'cairo': ['Cairo', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}