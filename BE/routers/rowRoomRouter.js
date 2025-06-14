import express from "express"
import { addRowRoom, deleteRowOfRoom, updateRowRoom } from "../controllers/rowOfRoomController"
import { authentication } from "../middleware/auth"


const rowRoomRouter = express.Router()

rowRoomRouter.post("/addRowRoom",authentication, addRowRoom)
rowRoomRouter.patch("/updateRowRoom",authentication, updateRowRoom)
rowRoomRouter.delete("/deleteRowRoom",authentication, deleteRowOfRoom)

export default rowRoomRouter