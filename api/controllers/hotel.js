import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

export const createHotel = async (req,res,next) =>{
    const newHotel = new Hotel(req.body)
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }catch(err){
        // instead of sending error json reponse individually, call the next middleware by passing error parameter
        // since error handling middleware is the last middleware and it recieves error parameter it will be executed (for all the middlewares throwing errors)
        // res.status(500).json(err)
        next(err)
    }
}

export const getHotel = async (req,res,next) =>{
    try{
        const hotel = await Hotel.findById(req.params.id)    // this will find hotel by its id(req.params.id) and will replace($SET:req.body) it with the content of the request. also it will return this newly updated hotel data in response(new: true). if we donot write (new:true), it will update in database but will return the prev unchanged data in response
        res.status(200).json(hotel)
    }catch(err){
        // instead of sending error json reponse individually, call the next middleware by passing error parameter
        // since error handling middleware is the last middleware and it recieves error parameter it will be executed (for all the middlewares throwing errors)
        // res.status(500).json(err)
        next(err)
    }
}

export const getHotels = async (req,res,next) =>{
    const {min,max, ...others} = req.query;
    // console.log("Hi I am hotel route")
    // next()

    // to create error(generalized error creation for every error) and call the last middleware = error handling middleware
    // const failed = true;
    // if(failed) return next(createError(401,"You are not authenticated"));
    try{
        const hotels = await Hotel.find({...others,cheapestPrice:{$gt:min||1,$lt:max||10000}}).limit(req.query.limit)    // this will find hotel by its id(req.params.id) and will replace($SET:req.body) it with the content of the request. also it will return this newly updated hotel data in response(new: true). if we donot write (new:true), it will update in database but will return the prev unchanged data in response
        res.status(200).json(hotels)
    }catch(err){
        // instead of sending error json reponse individually, call the next middleware by passing error parameter
        // since error handling middleware is the last middleware and it recieves error parameter it will be executed (for all the middlewares throwing errors)
        // res.status(500).json(err)
        next(err)
    }
}

export const updateHotel = async (req,res,next) =>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})    // this will find hotel by its id(req.params.id) and will replace($SET:req.body) it with the content of the request. also it will return this newly updated hotel data in response(new: true). if we donot write (new:true), it will update in database but will return the prev unchanged data in response
        res.status(200).json(updatedHotel)
    }catch(err){
        // instead of sending error json reponse individually, call the next middleware by passing error parameter
        // since error handling middleware is the last middleware and it recieves error parameter it will be executed (for all the middlewares throwing errors)
        // res.status(500).json(err)
        next(err)
    }
}

export const deleteHotel = async (req,res,next) =>{
    try{
        await Hotel.findByIdAndDelete(req.params.id)    // this will find hotel by its id(req.params.id) and will replace($SET:req.body) it with the content of the request. also it will return this newly updated hotel data in response(new: true). if we donot write (new:true), it will update in database but will return the prev unchanged data in response
        res.status(200).json("Hotel deleted successfully!")
    }catch(err){
        // instead of sending error json reponse individually, call the next middleware by passing error parameter
        // since error handling middleware is the last middleware and it recieves error parameter it will be executed (for all the middlewares throwing errors)
        // res.status(500).json(err)
        next(err)
    }
}

export const getHotelRooms = async (req,res,next) =>{
    try{
         const hotel = await Hotel.findById(req.params.id)
         const list = await Promise.all(hotel.rooms.map((room)=>{
            return Room.findById(room);
         }));
         res.status(200).json(list)
    }catch(err){
        // instead of sending error json reponse individually, call the next middleware by passing error parameter
        // since error handling middleware is the last middleware and it recieves error parameter it will be executed (for all the middlewares throwing errors)
        // res.status(500).json(err)
        next(err)
    }
}

export const countByCity = async (req,res,next) =>{
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    }catch(err){
        // instead of sending error json reponse individually, call the next middleware by passing error parameter
        // since error handling middleware is the last middleware and it recieves error parameter it will be executed (for all the middlewares throwing errors)
        // res.status(500).json(err)
        next(err)
    }
}

export const countByType = async (req,res,next) =>{
    try{
        const hotelCount = await Hotel.countDocuments({type:"hotel"})
        const apartmentCount = await Hotel.countDocuments({type:"apartment"})
        const resortCount = await Hotel.countDocuments({type:"resort"})
        const villaCount = await Hotel.countDocuments({type:"villa"})
        const cabinCount = await Hotel.countDocuments({type:"cabin"})

        res.status(200).json([
            {type:"hotel",count:hotelCount},
            {type:"apartments",count:apartmentCount},
            {type:"resorts",count:resortCount},
            {type:"villas",count:villaCount},
            {type:"cabins",count:cabinCount}
        ]);
    }catch(err){
        // instead of sending error json reponse individually, call the next middleware by passing error parameter
        // since error handling middleware is the last middleware and it recieves error parameter it will be executed (for all the middlewares throwing errors)
        // res.status(500).json(err)
        next(err)
    }
}