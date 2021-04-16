import React, { useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import './stats.css';

const Stats: React.FC = () => {
  const { allProducts } = useContext(GlobalContext);

  return (
    <div id="stats__container"></div>
  )
}

export default Stats;
