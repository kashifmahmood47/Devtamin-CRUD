const mongoose = require("mongoose");

const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter product name"]
    },
    desc: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 0

    },
    price: {
        type: Number,
        required: [true, "Please enter product price"]
    },
    image: {
        type: String,
        required: [true, "Please enter product image"]
    },
},
    {
        timestamps: true
    }
)

const Product = mongoose.model("Product", productSchema)

module.exports = Product