import React from 'react';

import * as interfaces from '../../../modules/interfaces';

interface OrderPreviewProps {
  order: {
    date: Date;
    id: string;
    products: interfaces.DisplayProduct[];
    totalItemCount: number;
    eta: Date;
    delivery?: {
      status: boolean;
      date: Date;
    };
  };
};

const OrderPreview: React.FC<OrderPreviewProps> = ({ order }) => {
  return (
    <div></div>
  )
}

export default OrderPreview;
