import express from "express";
import { signup, signin } from "../controllers/user.controller.js";

const router = express.Router()

router.post('/singup' , signup)
router.post('/signin', signin)

export default router