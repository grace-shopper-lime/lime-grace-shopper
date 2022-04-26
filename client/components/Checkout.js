import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCartThunk } from '../store/cart';
import { clearCart } from '../store/cart';
import { orderCheckoutThunk } from '../store/singleOrder';
import SingleOrderItem from './SingleOrderItem';
import SubTotal from './SubTotal';
import { Login } from './AuthForm';
import Address from './Address';
import PayPalCheckout from './PayPalCheckout';

export class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = { token: false };
  }
  componentWillUnmount() {
    this.props.clearCart();
  }
  componentDidMount() {
    this.props.fetchCart();
    this.setState({ token: window.localStorage.getItem('token') !== null });
  }

  render() {
    return (
      <div className="checkout">
        <div id="checkout-info">
          {this.state.token ? (
            <React.Fragment>
              <Address user={this.props.user} />
              <PayPalCheckout />
            </React.Fragment>
          ) : (
            <Login />
          )}
        </div>
        <div id="order-summary">
          <p>Summary of Order</p>
          <div className="all-orders">
            {this.props.cart.map((cart) => (
              <SingleOrderItem key={cart.product.id} order={cart} />
            ))}
          </div>
          <SubTotal items={this.props.cart} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  user: {
    email: state.auth.email,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    streetAddress: state.auth.streetAddress,
    apartment: state.auth.apartment,
    city: state.auth.city,
    state: state.auth.state,
    postalCode: state.auth.postalCode,
    country: state.auth.country,
  },
});

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    fetchCart: () => dispatch(setCartThunk()),
    clearCart: () => dispatch(clearCart()),
    checkout: (confirmation) =>
      dispatch(orderCheckoutThunk(confirmation, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
