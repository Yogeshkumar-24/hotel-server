import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js'
import { createError } from '../utils/error.js'



export const createHotel = async (req,res,next) => {
    const newHotel = new Hotel(req.body)
    try{
        const savedHotel = newHotel.save()
        res.status(200).json(newHotel)
   }catch(error){
    next(error)
   }
}

export const updateHotel = async (req,res,next) => {
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set : req.body},{new:true})
        res.status(200).json(updatedHotel)
    }
    catch(error){
        next(error)
    }
}

export const deleteHotel = async (req,res,next) => {
    try{
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted!")
    }catch(error){
        next(error)
    }
}

export const getHotel= async (req,res,next) => {
    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }
    catch(error){
        next(error)
    }
}


export const getAllHotels = async (req,res,next) => {
    const {min, max, ...others} = req.query
    // const {limit} = req.query
    // console.log(limit)
    try{
        const getHotels = await Hotel.find({
            ...others,
            cheapestPrice: {$gt: min ||500 ,$lt: max||2000}
        }).limit(req.query.limit || 4);
        res.status(200).json(getHotels)
    }  
    catch(error){
        next(error)
    }
}


export const countByCity = async (req,res,next) => {
    const cities = req.query.cities.split(',')
    try{
       const list = await Promise.all(cities.map((city) => {
        return Hotel.countDocuments({city:city})
       }))
        res.status(200).json(list)
    }  
    catch(error){
        next(error)
    }
}


export const countByType = async (req,res,next) => {
    try{
    const hotelCount = await Hotel.countDocuments({type:"hotel"})
    const apartmentCount = await Hotel.countDocuments({type:"apartment"})
    const villaCount = await Hotel.countDocuments({type:"villa"})
    const cottageCount = await Hotel.countDocuments({type:"cottage"})
    const resortCount = await Hotel.countDocuments({type:"resort"})
   
    res.status(200).json([
        {type :"hotel" ,count: hotelCount},
        {type :"apartment" ,count: apartmentCount},
        {type :"villa" ,count: villaCount},
        {type :"cottage" ,count: cottageCount},
        {type :"resort" ,count: resortCount},
    ])
    }  
    catch(error){
        next(error)
    }
}


export const getHotelRooms = async (req,res,next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room)
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}