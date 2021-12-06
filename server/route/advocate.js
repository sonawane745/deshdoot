const router=require("express").Router()
const { addAdvocate, getAllAdvocate, updateAdvocate, getAdvocate, deleteAdvocate } = require("../controller/advocate");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

router.route("/").post(verifyTokenAndAdmin,addAdvocate).get(getAllAdvocate);
router.route("/:id").patch(verifyTokenAndAdmin,updateAdvocate).get(verifyTokenAndAdmin,getAdvocate).delete(verifyTokenAndAdmin,deleteAdvocate);

module.exports=router
