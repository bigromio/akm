
export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: string;
  category: string;
  subCategory: string;
  imageUrl: string;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
