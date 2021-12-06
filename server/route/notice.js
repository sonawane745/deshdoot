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
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

const router = require("express").Router();

router.route("/").post( addNotice).get(getAllNotice);
router.route("/advocate").get(getByAdvocate);
router.route("/address").get(getByAddress);
router.route("/landinfo").get(getByLand);
// router.route("/date").get(getByDate);
router
  .route("/:id")
  .get(getSingleNotice)
  .patch(updateNotice)
  .delete(deleteNotice);

module.exports = router;
