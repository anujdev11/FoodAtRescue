const express = require("express");
const router = express.Router();

const { getAllFood, addFood, getFood, deleteFood, updateFood, getMyFood, getMyPosting, getReservation } = require("../controllers/foodController");

router.post("/addFood", addFood);
router.get("/getAllFood", getAllFood);
router.delete("/deleteFood/:id", deleteFood);
router.get("/getFood/:id", getFood);
router.put("/updateFood/:id", updateFood);
router.get("/getMyFood/:customerId", getMyFood);
router.get("/getMyPosting/:ownerId", getMyPosting);
router.get("/getReservation/:ownerId", getReservation);
module.exports = router;