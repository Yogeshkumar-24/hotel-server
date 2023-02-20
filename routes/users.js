import express from 'express'
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/user.js'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js'

const usersRoute = express.Router()

usersRoute.get('/checkauthentication' , verifyToken , (req,res,next) => {
    res.send("Hello User, You are logged In")
})


usersRoute.get('/checkuser/:id' , verifyUser , (req,res,next) => {
    res.send("Hello User, You are logged In and you can delete your accout")
})


usersRoute.get('/checkadmin/:id' , verifyAdmin , (req,res,next) => {
    res.send("Hello Admin, You are logged In and you can delete all accouts")
})

//update hotel
usersRoute.put('/:id',verifyUser,updateUser)


//Delete user
usersRoute.delete("/:id",verifyUser,deleteUser)

//get all users
usersRoute.get('/',verifyAdmin,getAllUsers)

//get one user
usersRoute.get('/:id',verifyUser,getUser)

export default usersRoute