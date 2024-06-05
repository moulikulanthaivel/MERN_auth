import express from "express"
import { user } from "../controllers/userContoller.js"

const userRoute = express.Router()

userRoute.get("/read",user)

export default userRoute