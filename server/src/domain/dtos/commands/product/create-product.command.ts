export type CreateProductCommandProps = {
  name: string;
  brand: string;
  price: number;
  immediatePrice: number;
  description?: string;
  category: 'sneakers' | 'clothing' | 'accessories' | 'tech' | 'life';
  imageUrl: string;
};

export class CreateProductCommand {
  readonly name: string;
  readonly brand: string;
  readonly price: number;
  readonly immediatePrice: number;
  readonly description?: string;
  readonly category: 'sneakers' | 'clothing' | 'accessories' | 'tech' | 'life';
  readonly imageUrl: string;

  constructor(props: CreateProductCommandProps) {
    this.name = props.name;
    this.brand = props.brand;
    this.price = props.price;
    this.immediatePrice = props.immediatePrice;
    this.description = props.description;
    this.category = props.category;
    this.imageUrl = props.imageUrl;
  }
}
