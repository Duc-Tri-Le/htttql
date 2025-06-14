import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import { connectDB } from "./config/connectDb.js"
import userRouter from "./routers/userRouter.js"
import roomRouter from "./routers/roomRouter.js"
import rowRoomRouter from "./routers/rowRoomRouter.js"
import serviceRouter from "./routers/serviceRouter.js"
import contractRouter from "./routers/contractRouter.js"
import billRouter from "./routers/billRouter.js"

const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

//ket noi DB
connectDB()

//router
app.use("/api/user", userRouter)
app.use("/api/room", roomRouter)
app.use("/api/rowRoom", rowRoomRouter)
app.use("/api/service", serviceRouter)
app.use("/api/contract", contractRouter)
app.use("/api/bill", billRouter)

//lang nghe port
app.listen(port, () =>{
    console.log(`Server is starting on http://localhost:${port}`);
})