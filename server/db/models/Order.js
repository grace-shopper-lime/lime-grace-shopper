const db = require('../db');
const Sequelize = require('sequelize');
const CartItem = require('./CartItem');

const Order = db.define('order', {
  confirmation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  totalPrice: {
    type: Sequelize.BIGINT,
  },
});

Order.checkout = async function (userId, confirmation) {
  const orderInfo = await CartItem.getCart(userId);
  if (!orderInfo.length) throw 'cart is empty?!';

  const totalPrice = orderInfo.reduce(
    (sum, item) => sum + item.product.price * 100 * item.quantity,
    0
  );
  console.log(typeof totalPrice);
  console.log(totalPrice);
  const order = await Order.create({ confirmation, userId, totalPrice });

  orderInfo.forEach((element) => {
    element.setOrder(order);
  });

  return {
    summary: { confirmation: order.confirmation, totalPrice: order.totalPrice },
    items: orderInfo,
  };
};

Order.getOrder = async function (userId, confirmation) {
  const order = await Order.findOne({ where: { userId, confirmation } });
  const orderInfo = await CartItem.getCart(userId, order.id);
  return {
    summary: { confirmation: order.confirmation, totalPrice: order.totalPrice },
    items: orderInfo,
  };
};
module.exports = Order;
