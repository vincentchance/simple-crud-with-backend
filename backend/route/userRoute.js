import express from "express";
import {getUsers, getUserById, createUser, updateUserById, deleteUserById} from "../controllers/userController.js"

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.patch("/users/:id", updateUserById);
router.delete("/users/:id", deleteUserById);

export default router;