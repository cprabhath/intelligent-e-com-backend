//Purpose: Product controller to handle all the request and response

//-----------------------Importing Packages-------------------------//
const ProductSchema = require("../model/ProductSchema");
const UserSchema = require("../model/UserSchema");
const ResponseService = require("../services/ResponseService");
const openai = require("openai");
//-----------------------------------------------------------------//

//-----------------------OpenAI API Key-------------------------//
const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiClient = new openai.OpenAI({
  apiKey: openaiApiKey,
});
// -----------------------------------------------------------------//

// -----------------------OpenAI Completion-------------------------//
const openaiCompletion = async (prompt) => {
  const completion = await openaiClient.createCompletion({
    // fine-tuned engine
    engine: "ft:gpt-3.5-turbo-0125:personal:test02:A0oYYebK:ckpt-step-84",
    prompt: prompt,
    max_tokens: 100,
  });

  return completion.choices[0].text;
};
//-----------------------------------------------------------------//

// ==================== Find Product By Description ==================== //
const findbyProductDescription = async (description) => {
  await openaiCompletion(
    `Find a product with the following description: ${description}`
  )
    .then((response) => {
      const product = ProductSchema.findById({
        _id: response.id,
      });

      return {
        description: description,
        response: product,
        success: true,
      }
    })
    .catch((err) => {
      return {
        description: description,
        response: err,
        success: false,
      };
    });
}
// ====================================================================== //

//------------------Product Create----------------//
const create = (req, resp) => {
  const product = new ProductSchema({
    category: req.body.category,
    brand: req.body.brand,
    name: req.body.name,
    description: req.body.description,
    imageUrls: req.body.imageUrls,
    price: req.body.price,
    qtyOnHand: req.body.qtyOnHand,
  });

  product
    .save()
    .then(() => {
      return ResponseService(resp, 200, "Product created successfully");
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//------------------------------------------------//

//------------------Product Find By Id------------//
const findById = (req, resp) => {
  ProductSchema.findById({ _id: req.params.id })
    .then((selectedObj) => {
      if (!selectedObj) {
        return ResponseService(
          resp,
          404,
          "Product not found with id " + req.params.id
        );
      } else {
        resp.json(selectedObj);
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//------------------------------------------------//

//------------------Product Update----------------//
const update = async (req, resp) => {
  const updateData = await ProductSchema.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        category: req.body.category,
        brand: req.body.brand,
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        qtyOnHand: req.body.qtyOnHand,
      },
    },
    { new: true }
  );
  if (updateData) {
    return ResponseService(resp, 200, "Product updated successfully");
  } else {
    return ResponseService(
      resp,
      500,
      "Error updating Product with id " + req.params.id
    );
  }
};
//------------------------------------------------//

//------------------Product Delete----------------//
const deleteById = async (req, resp) => {
  const deleteData = await ProductSchema.findByIdAndDelete(req.params.id);
  if (deleteData) {
    return ResponseService(resp, 200, "Product deleted successfully");
  } else {
    return ResponseService(
      resp,
      500,
      "Could not delete Product with id " + req.params.id
    );
  }
};
//------------------------------------------------//

//------------------Product Find All--------------//

const findAll = async (req, resp) => {
  try {
    const data = await ProductSchema.find();
    resp.status(200).json(data);
  } catch (err) {
    return ResponseService(resp, 500, err);
  }
}
//------------------------------------------------//

//------------------Product Count----------------//
const count = async (req, resp) => {
  try {
    const data = await ProductSchema.countDocuments();
    resp.status(200).json(data);
  } catch (err) {
    return ResponseService(resp, 500, err.message);
  }
};

//------------------Search Product----------------//
const searchProducts = async (req, resp) => {
  try {
    const { query } = req.query;
    let searchConditions = [];

    if (query) {
      const regexQuery = { $regex: query, $options: "i" };
      searchConditions.push({ brand: regexQuery });
      searchConditions.push({ name: regexQuery });
      searchConditions.push({ category: regexQuery });
    }

    let mongoQuery = {};
    if (searchConditions.length > 0) {
      mongoQuery = { $or: searchConditions };
    }

    const products = await ProductSchema.find(mongoQuery);
    resp.status(200).json(products);
  } catch (err) {
    return ResponseService(resp, 500, err.message);
  }
};

//------------------------------------------------//

//--------------------Qty Update-------------------//
const updateQuantity = async (req, resp) => {
  const productId = req.params.id;

  // Check if qtyOnHand is provided in the request
  if (req.body.qtyOnHand === undefined) {
    return ResponseService(resp, 400, "Quantity not provided");
  }

  const newQuantity = req.body.qtyOnHand;

  try {
    const updatedProduct = await ProductSchema.findOneAndUpdate(
      { _id: productId },
      { $set: { qtyOnHand: newQuantity } },
      { new: true }
    );

    if (updatedProduct) {
      return ResponseService(resp, 200, "Product quantity updated successfully", updatedProduct);
    } else {
      return ResponseService(resp, 404, "Product not found with id " + productId);
    }
  } catch (error) {
    console.error("Error updating product quantity:", error);
    return ResponseService(resp, 500, "Error updating product quantity with id " + productId);
  }
};

const recommendProducts = async (req, res) => {
  const { userId } = req.body;

  try {
    // Find the user and populate their order history
    const user = await UserSchema.findById(userId).populate({
      path: 'orderHistory',
      populate: {
        path: 'products',
        model: 'Product',
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const purchasedProducts = user.orderHistory.flatMap(order => order.products);

    // Extract categories and brands from purchased products
    const categories = [...new Set(purchasedProducts.map(product => product.category))];
    const brands = [...new Set(purchasedProducts.map(product => product.brand))];

    // Find products that match the user's purchase history
    const recommendations = await ProductSchema.find({
      $or: [
        { category: { $in: categories } },
        { brand: { $in: brands } },
        { _id: { $in: purchasedProducts.map(product => product._id) } },
      ],
    }).limit(10); // Limit recommendations to 10 products

    return res.json({ success: true, recommendations });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



//------------------Export module----------------//
module.exports = {
  create,
  findById,
  update,
  deleteById,
  findAll,
  count,
  searchProducts,
  updateQuantity,
  recommendProducts,
};
//------------------------------------------------//
