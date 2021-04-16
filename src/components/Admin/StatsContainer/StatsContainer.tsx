import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { RouteContext } from '../../../contexts/RouteContext';
import Stats from '../Stats/Stats';
import './statsContainer.css';

const StatsContainer: React.FC = () => {
  const { user } = useContext(GlobalContext);
  
  const { dest } = useContext(RouteContext);

  return (
    <>
      {
        user.isAdmin && dest === '/stats/verified'
          ? <Stats />
          : !dest
            ? <Route exact path="/stats/verified">
              <Redirect to="/" />
            </Route>
            : <Route exact path="/stats/verified">
              <Redirect to={dest} />
            </Route>
      }
    </>
  )
}

export default StatsContainer;
