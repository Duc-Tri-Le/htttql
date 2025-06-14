import express from "express"
import { createBill } from "../controllers/billController"
import { authentication } from "../middleware/auth"

const billRouter = express.Router()

billRouter.post("/createBill",authentication, createBill)

export default billRouter