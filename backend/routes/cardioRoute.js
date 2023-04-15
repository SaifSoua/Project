const {
  getCardios,
  setCardio,
  updateCardio,
  deleteCardio,
} = require("../controllers/cardioController");

const { body } = require("express-validator");
const { protect } = require("../middleware/auth");

const router = require("express").Router();
router
  .route("/")
  .get(protect, getCardios)
  .post(
    protect,
    body("distance", "Please include your distance").notEmpty(),
    setCardio
  );
router.route("/:id").put(protect, updateCardio).delete(protect, deleteCardio);

module.exports = router;
