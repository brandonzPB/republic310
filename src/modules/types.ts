export type Reducer = (state: any, action: any) => typeof state;

export type DisplayProduct = {
  name: string;
  price: number;
  imageUrl: string;
  alt: string;
};