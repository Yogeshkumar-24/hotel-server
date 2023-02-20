import express from 'express'
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from '../controllers/room.js'
import { verifyAdmin } from '../utils/verifyToken.js'

const RoomsRoute = express.Router()

//create Room
RoomsRoute.post('/:hotelId',verifyAdmin, createRoom)
 
//update Room
RoomsRoute.put('/:id',verifyAdmin,updateRoom)
RoomsRoute.put('/availability/:id',updateRoomAvailability)


//Delete Room
RoomsRoute.delete("/:id/:hotelId",verifyAdmin,deleteRoom)

//get all Rooms
RoomsRoute.get('/',getAllRooms)

//get one Room
RoomsRoute.get('/:id',getRoom)

export default RoomsRoute