import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, getHotelRooms, updateHotel } from '../controllers/hotel.js'
import Hotel from '../models/Hotel.js'
import { createError } from '../utils/error.js'
import { verifyAdmin } from '../utils/verifyToken.js'

const hotelsRoute = express.Router()

//create hotel
hotelsRoute.post('/',verifyAdmin, createHotel)
 
//update hotel
hotelsRoute.put('/:id',verifyAdmin,updateHotel)


//Delete hotel
hotelsRoute.delete("/:id",verifyAdmin,deleteHotel)

//get all hotels
hotelsRoute.get('/',getAllHotels)

//get one hotel
hotelsRoute.get('/find/:id',getHotel)


hotelsRoute.get('/countByCity',countByCity)
hotelsRoute.get('/countByType',countByType)
hotelsRoute.get('/room/:id',getHotelRooms)

export default hotelsRoute