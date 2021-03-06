import React, { Component, Fragment, Suspense } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import Orders from './components/Orders';
import { me } from './store';
import ProductDetail from './components/ProductDetail';
import Products from './components/Products';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" exact component={Products} />
            <Route path="/products" exact component={() => <Products />} />
            <Route path="/products/:id" exact component={ProductDetail} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/orders/:id" exact component={Confirmation} />
            <Route path="/checkout" exact component={Checkout} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/products" exact component={Products} />
            <Route path="/products/:id" exact component={ProductDetail} />
            <Route path="/checkout" exact component={Checkout} />
            <Redirect to="/products" />
          </Switch>
        )}
      </div>
      /*
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
            <Route path="/products" exact component={Products} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
        <Switch>
          <Route path="/products" exact component={Products} />
          <Route path="/products/:id" exact component={ProductDetail} />
          <Route path="/cart" exact component={Cart} />
        </Switch>
      </div>
      */
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
