const express = require("express");
const { validateRegister, validateLogin } = require("../middlewares/auth");
const { register, login } = require("../controllers/auth");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

module.exports = router;
