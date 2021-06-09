import React from 'react';

import * as interfaces from '../../modules/interfaces';

import bearSrc from '../../assets/images/products/the_bear.jpg';
import bruinSrc from '../../assets/images/products/the_bruins.jpg';
import goldenSrc from '../../assets/images/products/the_golden_gate.jpg';
import hollywoodSrc from '../../assets/images/products/the_hollywood.jpg';
import malibuSrc from '../../assets/images/products/the_malibu.jpg';
import mudslideSrc from '../../assets/images/products/the_mudslide.jpg';
import sanAndreasSrc from '../../assets/images/products/the_san_andreas.jpg';
import smogSrc from '../../assets/images/products/the_smog.png';
import surferSrc from '../../assets/images/products/the_surfer.jpg';

interface SimpleProductProps {
  handleNav: (name: string) => void;
  product: interfaces.DisplayProduct;
};

const SimpleProduct: React.FC<SimpleProductProps> = ({ handleNav, product }) => {
  return (
    <div id="suggested-product__container">
      <div id="suggested-product-img__container" onClick={() => handleNav(product.name)}>
        <img 
          alt={product.alt}
          id="suggested-product-img"
          src={
            product.name === 'The Smog' ? smogSrc
            : product.name === 'The Hollywood' ? hollywoodSrc
            : product.name === 'The Golden Gate' ? goldenSrc
            : product.name === 'The Bear' ? bearSrc
            : product.name === 'The Surfer' ? surferSrc
            : product.name === 'The San Andreas' ? sanAndreasSrc
            : product.name === 'The Malibu' ? malibuSrc
            : product.name === 'The Mudslide' ? mudslideSrc
            : bruinSrc
          }
        />
      </div>

      <div id="suggested-product-name__container">
        <span id="suggested-product-name">
          {product.name}
        </span>
      </div>
    </div>
  )
}

export default SimpleProduct;
