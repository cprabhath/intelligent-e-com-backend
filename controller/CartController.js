//Purpose: Cart controller to handle all the request and response

//-----------------------Importing Packages-------------------------//
const CartSchema = require("../model/CartSchema");
const ResponseService = require("../services/ResponseService");
//-----------------------------------------------------------------//

//------------------Cart Create----------------//
const create = (req, resp) => {
  const cartSchema = new CartSchema({
    productId: req.body.productId,
    UserId: req.body.UserId,
  });
  cartSchema
    .save()
    .then(() => {
      return ResponseService(resp, 200, "Cart created successfully");
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//------------------------------------------------//

//------------------Card Find By Id-----------//
const findById = (req, resp) => {
  CartSchema.findOne(req.params.UserId)
    .then((selectedObj) => {
      if (!selectedObj) {
        return ResponseService(
          resp,
          404,
          "Cart not found with id " + req.params.UserId
        );
      } else {
        resp.send(selectedObj);
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//------------------------------------------------//

//------------------Cart Update---------------//
const update = async (req, resp) => {
  const updateData = await CartSchema.findOneAndUpdate(
    { UserId: req.body.UserId },
    {
      $set: {
        productId: req.body.productId,
      },
    },
    { new: true }
  );
  if (!updateData) {
    return ResponseService(
      resp,
      404,
      "Cart not found with id " + req.params.id
    );
  } else {
    return ResponseService(resp, 200, "Cart updated successfully");
  }
};
//------------------------------------------------//

//------------------Cart Delete---------------//
const deleteById = (req, resp) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  CartSchema.findOneAndUpdate(
    { UserId: userId },
    { $pull: { productId: productId } },
    { new: true }
  )
    .then((updatedCart) => {
      if (!updatedCart) {
        return ResponseService(
          resp,
          404,
          `Cart not found for user ID ${userId}`
        );
      } else if (!updatedCart.productId.includes(productId)) {
        return ResponseService(
          resp,
          200,
          "Product removed from cart successfully"
        );
      } else {
        return ResponseService(
          resp,
          404,
          `Product ID ${productId} not found in the cart`
        );
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      return ResponseService(resp, 500, err.message);
    });
};

//------------------------------------------------//

//------------------Wishlist Find All--------------//
const findAll = (req, resp) => {
  CartSchema.find()
    .then((data) => {
      resp.send(data);
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//------------------------------------------------//

//----------------------cart delete by userID----------------------//
const deleteByUserId = (req, resp) => {
  CartSchema.findOneAndDelete(req.params.UserId)
    .then((selectedObj) => {
      if (!selectedObj) {
        return ResponseService(
          resp,
          404,
          "Cart not found with id " + req.params.UserId
        );
      } else {
        ResponseService(resp, 200, "Cart deleted successfully");
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};

//------------------Exporting Functions----------------//
module.exports = {
  create,
  findById,
  update,
  deleteById,
  findAll,
  deleteByUserId,
};
//------------------------------------------------//
