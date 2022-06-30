import User from "../models/User.js"


export const getUser = async (req,res,next) =>{
    try{
        const user = await User.findById(req.params.id)    // this will find hotel by its id(req.params.id) and will replace($SET:req.body) it with the content of the request. also it will return this newly updated hotel data in response(new: true). if we donot write (new:true), it will update in database but will return the prev unchanged data in response
        res.status(200).json(user)
    }catch(err){
        // instead of sending error json reponse individually, call the next middleware by passing error parameter
        // since error handling middleware is the last middleware and it recieves error parameter it will be executed (for all the middlewares throwing errors)
        // res.status(500).json(err)
        next(err)
    }
}

export const getUsers = async (req,res,next) =>{
    // console.log("Hi I am hotel route")
    // next()

    // to create error(generalized error creation for every error) and call the last middleware = error handling middleware
    // const failed = true;
    // if(failed) return next(createError(401,"You are not authenticated"));
    try{
        const users = await User.find()    // this will find hotel by its id(req.params.id) and will replace($SET:req.body) it with the content of the request. also it will return this newly updated hotel data in response(new: true). if we donot write (new:true), it will update in database but will return the prev unchanged data in response
        res.status(200).json(users)
    }catch(err){
        // instead of sending error json reponse individually, call the next middleware by passing error parameter
        // since error handling middleware is the last middleware and it recieves error parameter it will be executed (for all the middlewares throwing errors)
        // res.status(500).json(err)
        next(err)
    }
}

export const updateUser = async (req,res,next) =>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})    // this will find hotel by its id(req.params.id) and will replace($SET:req.body) it with the content of the request. also it will return this newly updated hotel data in response(new: true). if we donot write (new:true), it will update in database but will return the prev unchanged data in response
        res.status(200).json(updatedUser)
    }catch(err){
        // instead of sending error json reponse individually, call the next middleware by passing error parameter
        // since error handling middleware is the last middleware and it recieves error parameter it will be executed (for all the middlewares throwing errors)
        // res.status(500).json(err)
        next(err)
    }
}

export const deleteUser = async (req,res,next) =>{
    try{
        await User.findByIdAndDelete(req.params.id)    // this will find hotel by its id(req.params.id) and will replace($SET:req.body) it with the content of the request. also it will return this newly updated hotel data in response(new: true). if we donot write (new:true), it will update in database but will return the prev unchanged data in response
        res.status(200).json("User deleted successfully!")
    }catch(err){
        // instead of sending error json reponse individually, call the next middleware by passing error parameter
        // since error handling middleware is the last middleware and it recieves error parameter it will be executed (for all the middlewares throwing errors)
        // res.status(500).json(err)
        next(err)
    }
}