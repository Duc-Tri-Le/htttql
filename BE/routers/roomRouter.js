import express from "express"
import { addRoom, deleteRoom, updateRoom } from "../controllers/roomController"
import { authentication } from "../middleware/auth"

const roomRouter = express.Router()

roomRouter.post("/addRoom",authentication, addRoom)
roomRouter.patch("/updateRoom",authentication, updateRoom)
roomRouter.delete("/deleteRoom",authentication, deleteRoom)

export default roomRouter