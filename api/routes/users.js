import express from "express";
import {getUser, getUsers, updateUser, deleteUser} from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// middleware to verify and authenticate users

// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("Hello user, you are logged in!")
// })
// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("Hello user, you are logged in and you can delete your account!")
// })
// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("Hello admin, you are logged in and you can delete all accounts!")
// })


// CRUD operations on mongoDB database for users(by admin)

// for now create user is not implemented(since register functionality for that -> user can do it directly, no need of admin)

// // CREATE(C)
// router.post("/",createUser)
// READ/GET(R)
router.get("/:id",verifyUser, getUser)
// GET ALL(R ALL)
router.get("/",verifyAdmin, getUsers)
// UPDATE(U)
router.put("/:id",verifyUser, updateUser)
// DELETE(D)
router.delete("/:id",verifyUser, deleteUser)

export default router