import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req,res,next) =>{
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)

    try{
        const savedRoom = await newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}})
        }catch(err){
            next(err)
        }
        res.status(200).json(savedRoom);
    }catch(err){
        next(err)
    }
}


export const getRoom = async (req,res,next) =>{
    try{
        const room = await Room.findById(req.params.id)    // this will find hotel by its id(req.params.id) and will replace($SET:req.body) it with the content of the request. also it will return this newly updated hotel data in response(new: true). if we donot write (new:true), it will update in database but will return the prev unchanged data in response
        res.status(200).json(room)
    }catch(err){
        // instead of sending error json reponse individually, call the next middleware by passing error parameter
        // since error handling middleware is the last middleware and it recieves error parameter it will be executed (for all the middlewares throwing errors)
        // res.status(500).json(err)
        next(err)
    }
}

export const getRooms = async (req,res,next) =>{
    // console.log("Hi I am hotel route")
    // next()

    // to create error(generalized error creation for every error) and call the last middleware = error handling middleware
    // const failed = true;
    // if(failed) return next(createError(401,"You are not authenticated"));
    try{
        const rooms = await Room.find()    // this will find hotel by its id(req.params.id) and will replace($SET:req.body) it with the content of the request. also it will return this newly updated hotel data in response(new: true). if we donot write (new:true), it will update in database but will return the prev unchanged data in response
        res.status(200).json(rooms)
    }catch(err){
        // instead of sending error json reponse individually, call the next middleware by passing error parameter
        // since error handling middleware is the last middleware and it recieves error parameter it will be executed (for all the middlewares throwing errors)
        // res.status(500).json(err)
        next(err)
    }
}

export const updateRoom = async (req,res,next) =>{
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})    // this will find hotel by its id(req.params.id) and will replace($SET:req.body) it with the content of the request. also it will return this newly updated hotel data in response(new: true). if we donot write (new:true), it will update in database but will return the prev unchanged data in response
        res.status(200).json(updatedRoom)
    }catch(err){
        // instead of sending error json reponse individually, call the next middleware by passing error parameter
        // since error handling middleware is the last middleware and it recieves error parameter it will be executed (for all the middlewares throwing errors)
        // res.status(500).json(err)
        next(err)
    }
}

export const updateRoomAvailability = async (req,res,next) =>{
    try{
        await Room.updateOne(
            {"roomNumbers._id":req.params.id}, 
            {
            $push:{
                "roomNumbers.$.unavailableDates": req.body.dates
            }
        }
        );
        res.status(200).json("Room status has been updated!")
    }catch(err){
        // instead of sending error json reponse individually, call the next middleware by passing error parameter
        // since error handling middleware is the last middleware and it recieves error parameter it will be executed (for all the middlewares throwing errors)
        // res.status(500).json(err)
        next(err)
    }
}

export const deleteRoom = async (req,res,next) =>{
    try{
        const hotelId = req.params.hotelid;
        await Room.findByIdAndDelete(req.params.id) 
        try{
            await Hotel.findByIdAndUpdate(hotelId,{
                $pull: {rooms:req.params.id},
            });
        }catch(err){
            next(err);
        }
        // this will find hotel by its id(req.params.id) and will replace($SET:req.body) it with the content of the request. also it will return this newly updated hotel data in response(new: true). if we donot write (new:true), it will update in database but will return the prev unchanged data in response
        res.status(200).json("Room deleted successfully!")
    }catch(err){
        // instead of sending error json reponse individually, call the next middleware by passing error parameter
        // since error handling middleware is the last middleware and it recieves error parameter it will be executed (for all the middlewares throwing errors)
        // res.status(500).json(err)
        next(err)
    }
}