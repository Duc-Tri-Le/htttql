import express from "express"
import { cancelContract, createContract, extendContract } from "../controllers/contractController.js"
import { authentication } from "../middleware/auth.js"

const contractRouter = express.Router()

contractRouter.post("/createContract", createContract)
contractRouter.patch("/extendContract", extendContract)
contractRouter.delete("/cancelContract", cancelContract)

export default contractRouter