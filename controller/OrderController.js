// Purpose: Order controller to handle all the request and response

//-----------------------Importing Packages-------------------------//
const OrderSchema = require("../model/OrdersSchema");
const UserSchema = require("../model/UserSchema");
const ResponseService = require("../services/ResponseService");
const invoiceEmailService = require("../services/InvoiceEmailService");
//-----------------------------------------------------------------//

//------------------Order create----------------//
const create = (req, resp) => {
  const order = new OrderSchema({
    orderID: req.body.orderID,
    userID: req.body.userID,
    totalCost: req.body.totalCost,
    products: req.body.products,
  });

  if (!req.body.userID) {
    return ResponseService(resp, 400, "User ID cannot be empty");
  }

  UserSchema.findById(req.body.userID)
    .then((user) => {
      if (!user) {
        return ResponseService(resp, 404, "User not found");
      }

      order.save()
        .then((data) => {
          if (data) {
            invoiceEmailService.sendEmail(resp, user.email, "Invoice", {
              orderID: req.body.orderID,
              totalCost: req.body.totalCost,
              products: req.body.products.map(product => ({
                name: product.name,
                quantity: product.quantity,
                price: product.price
              })),
            });
            return ResponseService(resp, 200, "Order created successfully");
          } else {
            return ResponseService(resp, 500, "Failed to create order");
          }
        })
        .catch((err) => {
          return ResponseService(resp, 500, err.message);
        });
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};

//---------------------------------------------//

//------------------Order Find By Id-----------//
const findById = (req, resp) => {
  OrderSchema.find(req.params.userID)
    .then((selectedObj) => {
      if (!selectedObj) {
        return ResponseService(
          resp,
          404,
          "Order not found with id " + req.params.userID
        );
      } else {
        resp.send(selectedObj);
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//---------------------------------------------//

//------------------Order Update---------------//
const update = async (req, resp) => {
  const updateData = await OrderSchema.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: req.body.status
      },
    },
    { new: true }
  );
  if (updateData) {
    return ResponseService(resp, 200, "Order updated successfully");
  } else {
    return ResponseService(
      resp,
      500,
      "Error updating Order with id " + req.params.id
    );
  }
};
//---------------------------------------------//

//------------------Order Delete---------------//
const deleteById = async (req, resp) => {
  const deleteData = await OrderSchema.findByIdAndDelete(req.params.id);
  if (deleteData) {
    return ResponseService(resp, 200, "Order deleted successfully");
  } else {
    return ResponseService(
      resp,
      500,
      "Error deleting Order with id " + req.params.id
    );
  }
};
//---------------------------------------------//

//------------------Order Find All---------------//
const findAll = (req, resp) => {
  OrderSchema.find()
    .then((data) => {
      resp.send(data);
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//---------------------------------------------//

//------------------Get count of pending orders---------------//
const count = (req, resp) => {
  OrderSchema.find({ status: "Pending" }).countDocuments()
    .then((data) => {
      resp.status(200).json(data);
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
}


//------------------Export module---------------//
module.exports = {
  create,
  findById,
  update,
  deleteById,
  findAll,
  count
};
//---------------------------------------------//
