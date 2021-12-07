const User = require("../model/userModel");
const bcrypt =require("bcrypt")

exports.updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(password,10)
    
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully !" });
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, __v, ...others } = user._doc;
    res.status(200).json({ success: true, others });
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getAllUser = async (req, res) => {
  const query = req.query.new;
  try {
    const user = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json(error);
  }
};
