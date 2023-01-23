export class ProductModel {
  image: string;
  title: string;
  price: string;
  oldPrice: string;
  credit: string;
  calculateRating: string;
  description: string;
  advantages: string;
  disAdvantages: string;
  categories: string;
  tags: string;
  characteristics: {
    [key: string]: string;
  };
}
