import React, { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

const Body: React.FC = () => {
  const { login } = useContext(GlobalContext);

  const handleClick = () => {
  }
  
  return (
    <div id="test">
      <button onClick={handleClick}>Login</button>
    </div>
  )
}

export default Body;
