import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProductsThunk } from '../store/allProducts';
export class Products extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    const { products } = this.props || [];
    return (
      <div className="all-products">
        {products.map((product) => (
          <div key={product.id} className="container">
            <img src={product.imageUrl} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}</p>
            <button type="button" className="blue buybtn">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ products: state.products });

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(setProductsThunk()),
});

// export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
export default connect(mapStateToProps, mapDispatchToProps)(Products);
