import React from 'react';

import * as interfaces from '../../../modules/interfaces';

interface OrderPreviewProps {
  order: {
    date: Date;
    id: string;
    products: interfaces.Product[];
    totalItemCount: number;
    delivery?: {
      status: boolean;
      eta: Date;
    };
  };
};

const OrderPreview: React.FC<OrderPreviewProps> = ({ order }) => {
  return (
    <div></div>
  )
}

export default OrderPreview;
