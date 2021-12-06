const router = require("express").Router();
const { addUser, loginUser } = require("../controller/auth");
const { updateUser,deleteUser, getUser, getAllUser } = require("../controller/user");
const { verifyTokenAndAuthorized, verifyTokenAndAdmin } = require("../middleware/verifyToken");

router.route("/register").post(addUser);
router.route("/login").post(loginUser);
router.route("/users").get(verifyTokenAndAdmin,getAllUser)
router.route("/:id").get(verifyTokenAndAdmin,getUser).post(verifyTokenAndAuthorized, updateUser).delete(verifyTokenAndAuthorized,deleteUser)

module.exports = router;
