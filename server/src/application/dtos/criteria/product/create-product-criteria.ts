export type CreateProductCriteria = {
  name: string;
  brand: string;
  price: number;
  immediatePrice: number;
  description?: string;
  category: 'sneakers' | 'clothing' | 'accessories' | 'tech' | 'life';
  imageUrl: string;
};
