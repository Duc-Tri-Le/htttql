import express from "express"
import { addStudent, deleteStudent, login, register } from "../controllers/userController"
import { authentication } from "../middleware/auth"

const userRouter = express.Router()

userRouter.post("/login",login)
userRouter.post("/register",register)
userRouter.post("/addStudent",authentication, addStudent)
userRouter.delete("/deleteStudent",authentication, deleteStudent)

export default userRouter