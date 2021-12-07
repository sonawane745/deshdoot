const User = require("../model/userModel");
const bcrypt =require("bcrypt")

const jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password,10)
    const newUser = new User({
      name,
      email,
      password:hashPassword
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
    const validate =await bcrypt.compare(req.body.password,user.password)
    if (!validate) {
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
