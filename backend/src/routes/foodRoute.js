const express = require("express");
const router = express.Router();

const { getAllFood, addFood, getFood, deleteFood, updateFood } = require("../controllers/foodController")

router.post("/addFood", addFood);
router.get("/getAllFood", getAllFood);
router.delete("/deleteFood/:id", deleteFood);
router.get("/getFood/:id", getFood);
router.put("/updateFood/:id", updateFood);

module.exports = router;