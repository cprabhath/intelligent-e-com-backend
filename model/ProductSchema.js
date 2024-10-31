const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    qtyOnHand: {
      type: Number,
      required: true,
    },
    imageUrls: {
      type: [
        {
          url: {
            type: String,
            required: true,
          },
          altText: {
            type: String,
            required: false,
          },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductsSchema);
