const Advocate = require("../model/advocatemodel");

exports.addAdvocate = async (req, res) => {
  try {
    const { name, email, address } = req.body;

    const advocate = new Advocate({ name, email, address });
    await advocate.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
exports.getAllAdvocate = async (req, res) => {
  try {

    const advocate = await Advocate.find();
    res.status(201).json({ success: true ,advocate});
  } catch (error) {
    res.status(400).json(error.message);
  }
};
exports.getAdvocate = async (req, res) => {
  try {
const {id} =req.params

    const advocate=await Advocate.findById(id).populate("notice");
    res.status(201).json({ success: true ,advocate});
  } catch (error) {
    res.status(400).json(error.message);
  }
};
exports.updateAdvocate = async (req, res) => {
  try {
    const { name, email, address } = req.body;
const {id} =req.params

    const data={name,email,address}
    const advocate=await Advocate.findByIdAndUpdate(id,data,{new:true})
    res.status(201).json({ success: true ,advocate});
  } catch (error) {
    res.status(400).json(error.message);
  }
};
exports.deleteAdvocate = async (req, res) => {
    try {
  const {id} =req.params
  
      await Advocate.findByIdAndDelete(id)
      res.status(201).json({ success: true});
    } catch (error) {
      res.status(400).json(error.message);
    }
  };