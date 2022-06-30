import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {createRoom, getRoom, getRooms, updateRoom, deleteRoom, updateRoomAvailability} from "../controllers/room.js";

const router = express.Router();

// CRUD operations on mongoDB database for hotels
// CREATE(C)
router.post("/:hotelid",verifyAdmin, createRoom)
// READ/GET(R)
router.get("/:id",getRoom)
// GET ALL(R ALL)
router.get("/",getRooms)
// UPDATE(U)
router.put("/:id",verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailability )
// DELETE(D)
router.delete("/:id/:hotelid",verifyAdmin, deleteRoom)
export default router;
