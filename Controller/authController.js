import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const test = (req, res) => {
  res.send("Hello from auth Controller");
};

export const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    console.log(req.body.password.length);
    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password Must be 6 character" });
    }

    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashPassword });
    await newUser.save();

    const { password, ...user } = newUser._doc;

    res.status(200).json({ success: true, user: user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const signin = async (req, res) => {
  try {
    // console.log(req.body);
    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password Must be 6 character" });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      res.status(400).json({ success: false, message: "Wrong Credentials!" });
      return;
    }
    // console.log(user);
    const token = jwt.sign({ id: user._id }, process.env.jwt_secret_key);

    const { password, ...others } = user._doc;
    // console.log(token);

    res.status(200).json({ user: others, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
