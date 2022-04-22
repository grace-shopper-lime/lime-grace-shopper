import React, { Component } from "react";
import { connect } from "react-redux";
import { setSingleProductThunk, clearSingleProduct } from "../store/singleProduct";
import { Button, Typography, Grid } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
  image: {
    maxWidth: 400,
    height: "auto",
    margin: theme.spacing(3),
  },
  description: {
    minHeight: 400,
    margin: "auto",
    border: "1px solid black",
    margin: theme.spacing(5),
  },
  price: {
    color: "#B12765",
    margin: theme.spacing(3),
  },
  buttonBox: {
    display: "flex",
    alignItems: "end",
    justifyContent: "end",
  },
});

export class ProductDetail extends Component {
  componentDidMount() {
    this.props.setSingleProductThunk(this.props.match.params.id);
  }
  componentWillUnmount() {
    this.props.clearProductFromProps();
  }
  render() {
    const {
      classes,
      product: { name, description, price, stock, imageUrl },
    } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} md={6}>
          <img src={imageUrl} alt="product image" className={classes.image} />
        </Grid>
        <Grid container item xs={12} md={6}>
          <Grid item xs={6} md={3}>
            <Typography variant="h4">{name}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography component="p" className={classes.price}>
              ${price}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.description}>
          <Typography component="p">{description}</Typography>
        </Grid>
        <Grid item xs className={classes.buttonBox}>
          <Button variant="contained" color="primary">
            Purchase
          </Button>
        </Grid>
      </Grid>

      /* 
      <div className="product-detail">
        <h1> name: {name}</h1>
        <img src={imageUrl} />
        <p> description: {description}</p>
        <p> price: {price}</p>
        <p> stock: {stock}</p>
      </div>
      */
    );
  }
}

const mapState = state => ({
  product: state.product,
});

const mapDispatch = dispatch => ({
  setSingleProductThunk: id => dispatch(setSingleProductThunk(id)),
  clearProductFromProps: () => dispatch(clearSingleProduct()),
});

export default connect(mapState, mapDispatch)(withStyles(useStyles)(ProductDetail));
