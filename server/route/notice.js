const {
  addNotice,
  getAllNotice,
  getByAdvocate,
  getByLand,
  getSingleNotice,
  updateNotice,
  deleteNotice,
  getByDate,
  getByAddress,
} = require("../controller/notice");
const { verifyTokenAndAdmin, verifyTokenAndAuthorized } = require("../middleware/verifyToken");

const router = require("express").Router();

router.route("/").post(verifyTokenAndAdmin, addNotice).get(verifyTokenAndAuthorized,getAllNotice);
router.route("/advocate").get(getByAdvocate);
router.route("/address").get(getByAddress);
router.route("/landinfo").get(getByLand);
// router.route("/date").get(getByDate);
router
  .route("/:id")
  .get(verifyTokenAndAuthorized,getSingleNotice)
  .patch(verifyTokenAndAdmin,updateNotice)
  .delete(verifyTokenAndAdmin,deleteNotice);

module.exports = router;
