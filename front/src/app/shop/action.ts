export interface Product {
  id: string;
  brand: string;
  name: string;
  price: number;
  immediatePrice: number;
  imageUrl: string;
  category: "sneakers" | "clothing" | "accessories" | "tech" | "life";
}
import { faker } from "@faker-js/faker/locale/ko";

const brands = [
  "Nike",
  "Adidas",
  "New Balance",
  "Stone Island",
  "Supreme",
  "Stussy",
  "Apple",
  "Samsung",
];

const categories = [
  "sneakers",
  "clothing",
  "accessories",
  "tech",
  "life",
] as const;

export function generateFakeProduct(): Product {
  const category = faker.helpers.arrayElement(categories);
  const brand = faker.helpers.arrayElement(brands);
  const basePrice = faker.number.int({ min: 50000, max: 1000000 });

  return {
    id: faker.string.uuid(),
    brand,
    name: `${brand} ${faker.commerce.productName()}`,
    price: Math.round(basePrice / 1000) * 1000, // 천원 단위로 반올림
    immediatePrice: Math.round((basePrice * 1.2) / 1000) * 1000,
    imageUrl: faker.image.urlLoremFlickr({ category: "fashion" }),
    category,
  };
}

export function generateFakeProducts(count: number): Product[] {
  return Array.from({ length: count }, generateFakeProduct);
}
