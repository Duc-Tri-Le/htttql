import express from "express"
import { addService, deleteService, updateService } from "../controllers/serviceController"
import { authentication } from "../middleware/auth"

const serviceRouter = express.Router()

serviceRouter.post("/addService",authentication, addService)
serviceRouter.patch("/updateService",authentication, updateService)
serviceRouter.delete("/deleteService",authentication, deleteService)

export default serviceRouter