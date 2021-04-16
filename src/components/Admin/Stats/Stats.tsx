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

    setSort({ ...sort, type: data.type });
  }

  let sortedProducts: any = allProducts.slice();

  const totalRevenue: number = sortedProducts.reduce((total: number, item: interfaces.DisplayProduct) => {
    return total += (item.price * item.qtySold);
  }, 0);

  sortedProducts = sortedProducts.map((item: interfaces.DisplayProduct) => {
    const revenue: number = (item.price * item.qtySold);
    const revenuePercent: string = (revenue / totalRevenue).toFixed(2);

    return {
      ...item,
      revenue,
      revenuePercent,
    };
  });

  sortedProducts = sort.type === 'revenuePercentAscend' ?
      quickSortProducts(sortedProducts, 'revenuePercent')
    : sort.type === 'revenuePercentDescend' ?
      quickSortProducts(sortedProducts, 'revenuePercent').reverse()
    : sort.type === 'revenueDescend' ?
      quickSortProducts(sortedProducts, 'revenue').reverse()
    : quickSortProducts(sortedProducts, 'revenue');

  const ProductComponents = sortedProducts.map((product: any) => {
    return (
      <ul className="product-analysis-list">
        <li className="product-analysis-list-item">Quantity Sold: {product.qtySold}</li>
        <li className="product-analysis-list-item">Price: ${product.price}.00</li>
        <li className="product-analysis-list-item">Revenue generated (USD): ${product.revenue}</li>
        <li className="product-analysis-list-item">Revenue generated (% of total): {product.revenuePercent}%</li>
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
                <option value="revenueAscend">Revenue (descending)</option>
                <option value="revenuePercentAscend">Percent of Revenue (ascending)</option>
                <option value="revenuePercentDescend">Percent of Revenue (ascending)</option>
              </select>

              <button id="sort-analysis-btn">Update List</button>

            </form>

            {ProductComponents}
          </div>
          : <></>
      }
    </>
  )
}

export default Stats;
