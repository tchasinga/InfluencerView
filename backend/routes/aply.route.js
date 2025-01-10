import express from "express";
import { createSharing, getSharing, getSharingById } from "../controllers/aply.controller.js";

const router = express.Router(); // Move this line up to initialize the router first

router.post("/create", createSharing);
router.get("/get", getSharing);
router.get("/getbyid/:id", getAplyById);


export default router;
