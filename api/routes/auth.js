import express from "express";
import { register, login } from "../controllers/auth.js";

const router = express.Router();

// router.get("/",(req,res)=>{
//     res.send("Hello, thanks for sending get request at auth")
// })

// router.get("/register",(req,res)=>{
//     res.send("Hello, thanks for sending get request at auth register")
// })

router.post("/register",register)
router.post("/login",login)
export default router