import express from "express"
import { cancelContract, createContract, extendContract } from "../controllers/contractController"
import { authentication } from "../middleware/auth"

const contractRouter = express.Router()

contractRouter.post("/createContract",authentication, createContract)
contractRouter.patch("/extendContract",authentication, extendContract)
contractRouter.patch("/cancelContract", authentication,cancelContract)

export default contractRouter