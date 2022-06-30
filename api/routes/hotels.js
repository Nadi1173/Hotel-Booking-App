import express from "express";
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js";
import {
    createHotel,
    getHotel,
    getHotels,
    updateHotel,
    deleteHotel,
    getHotelRooms,
    countByCity,
    countByType,
  } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CRUD operations on mongoDB database for hotels
// CREATE(C)
router.post("/",verifyAdmin, createHotel)
// READ/GET(R)
router.get("/find/:id",getHotel)
// GET ALL(R ALL)
router.get("/",getHotels)
router.get("/countByCity",countByCity)
router.get("/countByType",countByType)
router.get("/room/:id",getHotelRooms)
// UPDATE(U)
router.put("/:id",verifyAdmin, updateHotel)
// DELETE(D)
router.delete("/:id",verifyAdmin, deleteHotel)
export default router