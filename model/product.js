import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  UserId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Product", productSchema);
