const router = require("express").Router();
const { Op } = require("sequelize");
const {
  models: { User, Product, Cart },
} = require('../db');

async function checkIsAdmin (req,res,next) {
  try {
    const token = req.headers.authorization
    const user = await User.findByToken(token)
    if(user.admin=== true) next()
    else res.sendStatus(401)
  } catch (error) {
    next(error)
  }
}
// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const items = await Product.findAll({
      where: {
        stock: {
          [Op.ne]: 0,
        },
      },
    });
    res.send(items);
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const item = await Product.findByPk(req.params.id);
    res.send(item);
  } catch (error) {
    next(error);
  }
});

// POST /api/products
router.post("/", checkIsAdmin, async (req, res, next) => {
  try {
    const item = await Product.create(req.body);
    res.send(item);
  } catch (error) {
    next(error);
  }
});

// PUT /api/products/:id
// router.put("/:id", async (req, res, next) => {
//   try {
//     const [num, result] = await Product.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//       returning: true,
//     });
//     if (num) res.send(result);
//   } catch (error) {
//     next(error);
//   }
// });

// DELETE /api/products/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (result) res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
