import { Router } from "express";
import {Login, Register, getuser, logedOut} from "../controllers/userconroller.js";
import isAutherized from "../middleware/auth.js";

const userRouter = Router()


userRouter.post("/Register", Register)
userRouter.post("/login", Login)
userRouter.get("/logedout",isAutherized, logedOut )
userRouter.get("/getuser",isAutherized, getuser )

export default userRouter