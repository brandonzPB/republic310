import React, { useState } from 'react';
import { testimonials } from '../../../modules/testimonials';

import './testimonials.css';

const Testimonials = () => {
  const [testimonial, setTestimonial] = useState({
    idx: 0,
    author: testimonials[0].author,
    review: testimonials[0].review,
  });

  const nextReview = (): any => {
    return (testimonial.idx === 1)
      ? null
      : setTestimonial({
        author: testimonials[1].author,
        idx: 1,
        review: testimonials[1].review,
      });
  }
  
  const prevReview = (): any => {
    return (testimonial.idx === 0)
      ? null
      : setTestimonial({
        author: testimonials[0].author,
        idx: 0,
        review: testimonials[0].review,
      });
  }

  return (
    <div id="testimonials__container">
      <h1 id="testimonials-header">Customer Testimonials</h1>

      <div id="testimonials-carousel">
        <div id="testimonial__container">
          <span id="testimonial-content">"{testimonial.review}"</span>
          <span id="testimonial-author">{testimonial.author}</span>
        </div>

        <div id="carousel-btns__container">
          <button onClick={prevReview}>Previous</button>
          <button onClick={nextReview}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default Testimonials;
