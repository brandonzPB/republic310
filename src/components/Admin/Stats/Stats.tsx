import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../../contexts/GlobalContext';
import * as interfaces from '../../../modules/interfaces';
import quickSortProducts from '../../../modules/quickSortProducts';
import './stats.css';

interface SortType {
  type: string;
};

const Stats: React.FC = () => {
  const { user, allProducts } = useContext(GlobalContext);

  const [sort, setSort] = useState({ type: '' });

  const { register, errors, handleSubmit } = useForm<SortType>();

  const onSubmit = (data: any): any => {
    console.log('data', data);
    
    if (!allProducts.length || !user.isAdmin) {
      return;
    }

    console.log('Sorting products...');
    setSort({ ...sort, type: data.sort });
  }

  let productArrCopy: interfaces.DisplayProduct[] = allProducts.slice();

  const totalRevenue: number = productArrCopy.reduce((total: number, item: interfaces.DisplayProduct) => {
    return total + (item.price * item.qtySold);
  }, 0);

  // add revenue and revenue percentage to each product in array
  let updateProductArr: any = productArrCopy.map((item: interfaces.DisplayProduct) => {
    const revenue: number = (item.price * item.qtySold);
    const revenuePercent: number = +((revenue / totalRevenue).toFixed(2)) * 100;

    return {
      ...item,
      revenue,
      revenuePercent,
    };
  });

  // sort products based on sort type
  const sortedProducts: any = sort.type === 'revenuePercentAscend' ?
      quickSortProducts(updateProductArr, 'revenuePercent')
    : sort.type === 'revenuePercentDescend' ?
      quickSortProducts(updateProductArr, 'revenuePercent').reverse()
    : sort.type === 'revenueDescend' ?
      quickSortProducts(updateProductArr, 'revenue').reverse()
    : quickSortProducts(updateProductArr, 'revenue');

  const ProductComponents = sortedProducts.map((product: any) => {
    return (
      <ul className="product-analysis-list">
        <li className="product-analysis-list-item">Product: {product.name}</li>
        <li className="product-analysis-list-item">Quantity Sold: {product.qtySold}</li>
        <li className="product-analysis-list-item">Price: ${product.price}.00</li>
        <li className="product-analysis-list-item">Revenue generated (USD): ${product.revenue}</li>
        <li className="product-analysis-list-item">Revenue generated (% of total): {product.revenuePercent.toFixed(2)}%</li>
      </ul>
    );
  });

  return (
    <>
      {
        user.isAdmin
          ? <div id="stats__container">
            <form onSubmit={handleSubmit(onSubmit)}>

              <select name="sort" id="select-analysis-sort" ref={register}>
                <option value="revenueAscend">Revenue (ascending)</option>
                <option value="revenueDescend">Revenue (descending)</option>
                <option value="revenuePercentAscend">Percent of Revenue (ascending)</option>
                <option value="revenuePercentDescend">Percent of Revenue (descending)</option>
              </select>

              <button id="sort-analysis-btn">Update List</button>

            </form>

            <span id="revenue-text">Total Revenue: ${totalRevenue}</span>
            {ProductComponents}
          </div>
          : <></>
      }
    </>
  )
}

export default Stats;
