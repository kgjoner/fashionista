import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import CatalogRoute from './CatalogRoute'
import ProductRoute from './ProductRoute'

const Routes = ({ history }) => {

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, [history]);

  return (
  <Switch>
    <Route exact path="/" component={CatalogRoute} />
    <Route exact path="/produto/:productSlug" component={ProductRoute} />
  </Switch>
  );
}



export default withRouter(Routes);
