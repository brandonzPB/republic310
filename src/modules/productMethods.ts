import * as interfaces from './interfaces';

const productsArr = [
  {
    name: 'The Bear',
    description: `
      A tincture of some of the finest THC hemp can produce.
      This bottle contains 1000mg of THC, the psycho-active component of hemp.
    `
  },
  {
    name: 'The Bruins',
    description: `
      Help ease social nerves or ease into the night with our top-quality CBD
      gummy bears. Each gummy contains about 15mg of CBD. These do not contain any
      THC, so they will not get you high.
    `
  },
  {
    name: 'The Golden Gate',
    description: `
      This is one of our best sellers: a 1000mg tincture of CBG, one
      of the most restorative components of hemp. This product is THC-free
      and does not contain any of the plant's terpenes.
    `
  },
  {
    name: 'The Hollywood',
    description: `
      Our best seller: a full-spectrum CBD tincture. This product contains the
      plant's terpenes, as well as some THC (0.5%). While it won't get you high,
      this product will help you to feel your best and happiest.
    `
  },
  {
    name: 'The Malibu',
    description: `
      Our CBD-infused body lotion, made from the natural lipids of our 
      organic hemp. You can gently massage your body with this to ease the severity of
      dry skin, burns, or some other topical ailments.
    `
  },
  {
    name: 'The Mudslide',
    description: `
      The finest THC-infused brownies. Appropriately dosed at 100mg per brownie,
      these bad boys will help you live up the night with awesome 
      activities like watching hours of YouTube videos, or 
      painting a masterpiece à la Van Gogh.
    `
  },
  {
    name: 'The San Andreas',
    description: `
      These THC-infused cookies were named after the San Andreas fault line
      because they'll make you trip for sure. Each cookie contains 200mg of the 
      finest THC you can produce from organic hemp.
    `
  },
  {
    name: 'The Smog',
    description: `
      A 2g THC cartridge. 99% THC. Enough said.
    `
  },
  {
    name: 'The Surfer',
    description: `
      A tincture of some of the finest CBD hemp can produce.
      This bottle contains 1000mg of CBD, without any of the plant's
      terpenes. This product is THC-free and will not get you high.
    `
  },
]

export const getProductDescription = (name: string): any => {
  const productDescription = productsArr.find(product => product.name === name)!;

  return productDescription.description;
}

export const getProductDetails = (productName: string, allProducts: interfaces.DisplayProduct[]): any => {
  const productDetails: interfaces.DisplayProduct = allProducts
    .find((product: interfaces.DisplayProduct) => product.name === productName)!;

  return productDetails;
};

export const getProductInCart = (productName: string, cart: interfaces.Cart): any => {
  return cart.products.find((item: interfaces.Product) => item.name === productName);
};

export const getCartItemTotal = (cart: interfaces.Cart): any => {
  return cart.products.reduce((count, item) => { return count + item.quantity }, 0);
};

