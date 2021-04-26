import express from "express";
import UserServices from "./service";

const router = express.Router();

router.post("/login", UserServices.loginUser);
router.post("/register", UserServices.registerUser);

export default router;