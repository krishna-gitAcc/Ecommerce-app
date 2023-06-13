import product from "../model/product.js";

export const text = (req, res) => {
  res.send("Hello from product controller.");
};

export const postProduct = async (req, res) => {
  const newProduct = new product({ ...req.body, UserId: req.user.id });
  // console.log(req.headers);
  try {
    const saveProduct = await newProduct.save();
    res.status(200).json({ success: true, data: saveProduct });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getProducts = async (req, res) => {
  const productId = req.params.id;
  try {
    const requiredProduct = await product.findOne({
      productId: productId,
    });
    res.status(200).json({ success: true, data: requiredProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
