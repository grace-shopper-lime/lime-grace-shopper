const router = require("express").Router();

const {
  models: { User, Order },
} = require("../db");
const { requireToken } = require("./utils");

// /api/orders
router.get("/", requireToken, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.user.id,
      },
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// /api/orders/:id
router.get("/:id", requireToken, async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        id: orderId,
      },
    });
  } catch (error) {
    next(error);
  }
});

// /api/orders
//POST Route
router.post("/", requireToken, async (req, res, next) => {
  try {
    // array of cart items
    let { items, price } = req.body;
    // order.items, // order.price

    const order = await Order.create({
      totalPrice: price,
      userId: req.user.id,
    });

    await order.addCarts(items);
    await order.save();
    console.log(await order.getCarts());
    res.json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;