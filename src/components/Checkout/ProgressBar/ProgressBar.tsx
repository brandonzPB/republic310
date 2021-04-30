import React, { useContext } from 'react';
import { RouteContext } from '../../../contexts/RouteContext';
import { IoIosArrowForward } from 'react-icons/io';
import { IconContext } from 'react-icons';

import './progressBar.css';

interface ProgressBarProps {
  spotlight: 'cart' | 'shipping' | 'payment';
};

const ProgressBar: React.FC<ProgressBarProps> = ({ spotlight }: ProgressBarProps) => {
  const { dest, changeDest } = useContext(RouteContext);

  return(
    <div id="progress-bar__container">
      <span className="progress-text" style={{
        color: spotlight === 'cart' ? '#6DABA3' : '#E0E0E0',
        fontWeight: spotlight === 'cart' ? 600 : 400,
      }}
      >
        Cart
      </span>

      <IconContext.Provider value={{ style: {
        color: spotlight === 'cart' ? '#6DABA3' : '#E0E0E0',
        fontWeight: spotlight === 'cart' ? 600 : 400,
        opacity: spotlight === 'cart' ? 1 : 0.3,
      } }}>
        <IoIosArrowForward className="arrow-icon" />
      </IconContext.Provider>

      <span className="progress-text" style={{
        color: spotlight === 'shipping' ? '#6DABA3' : '#E0E0E0',
        fontWeight: spotlight === 'shipping' ? 600 : 400,
      }}
      >
        Shipping
      </span>

      <IconContext.Provider value={{ style: {
        color: spotlight === 'shipping' ? '#6DABA3' : '#E0E0E0',
        fontWeight: spotlight === 'shipping' ? 600 : 400,
        opacity: spotlight === 'shipping' ? 1 : 0.3,
      } }}>
        <IoIosArrowForward className="arrow-icon" />
      </IconContext.Provider>

      <span className="progress-text" style={{
        color: spotlight === 'payment' ? '#6DABA3' : '#E0E0E0',
        fontWeight: spotlight === 'payment' ? 600 : 400,
      }}
      >
        Payment
      </span>
    </div>
  );
}

export default ProgressBar;