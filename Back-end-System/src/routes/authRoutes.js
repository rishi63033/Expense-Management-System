const express = require("express");
const { signup, login , profile} = require("../controllers/authControllers");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authMiddleware, profile);
module.exports = router;
