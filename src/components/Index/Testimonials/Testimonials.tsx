import React from 'react';

import { testimonials } from '../../../modules/testimonials';

import Review from './Review';
import './testimonials.css';

interface Review {
  name: string;
  review: string;
};

const Testimonials = () => {
  const ReviewComponents = testimonials.map((review: Review) => {
    return ()
  });

  return (
    <div id="testimonials__container">
      <h1 id="testimonials-header">Customer Testimonials</h1>

      <div id="testimonials-carousel">
      </div>
    </div>
  )
}

export default Testimonials;
