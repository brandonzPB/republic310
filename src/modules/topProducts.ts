type TopProduct = {
  name: string;
  price: number;
  imageUrl: string;
  alt: string;
};

export const topProducts: TopProduct[] = [
  {
    name: 'The Hollywood',
    price: 150,
    imageUrl: 'the_hollywood.jpg',
    alt: 'A tincture bottle'
  },
  {
    name: 'The San Andreas',
    price: 75,
    imageUrl: 'the_san_andreas.jpg',
    alt: 'A stack of two chip cookies next to a cannabis leaf'
  },
  {
    name: 'The Malibu',
    price: 50,
    imageUrl: 'the_malibu.jpg',
    alt: 'A bottle of lotion next to a cannabis leaf'
  }
];
