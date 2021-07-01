import React from 'react';

import './review.css';

interface ReviewProps {
  author: string;
  review: string;
};

const Review: React.FC<ReviewProps> = ({ author, review }) => {
  return (
    <div id="review__container">
      <span id="review-content">{review}</span>
      <span id="review-author">{author}</span>
    </div>
  )
}

export default Review;
