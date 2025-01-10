import express from "express";
import { signup, signin, logout } from "../controllers/user.controller.js";

const router = express.Router()

router.post('/singup' , signup)
router.post('/signin', signin)
router.post('/logout', logout)

export default router