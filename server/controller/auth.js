const User = require("../model/userModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    });
    await newUser.save();
    res.status(201).json({ succcess: true,message:"Registerd successfully" });
  } catch (error) {
    res.status(201).json(error.message);
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("Wrong Email or Password");
    }
    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const pass = hashPassword.toString(CryptoJS.enc.Utf8);
    if (pass !== req.body.password) {
      return res.status(400).json("Wrong Email or Password");
    }
    const accessToken =await jwt.sign({
        id:user._id,isAdmin:user.isAdmin
    },process.env.JWT_SEC,{expiresIn:"2d"})
    const { password,__v, ...others } = user._doc;
    res.status(201).json({ succcess: true, accessToken,...others });
  } catch (error) {
    res.status(201).json(error.message);
  }
};
