import { Router } from "express";
import {ApplicationPost, deletApplication, employeGetAllApplication, jobseekerGetAllApplications} from "../controllers/applicationcontroller.js";
import isAutherized from "../middleware/auth.js";
const applicationRouter = Router()

applicationRouter.post("/applicationPost",isAutherized, ApplicationPost)
applicationRouter.get("/employeraplication",isAutherized, employeGetAllApplication)
applicationRouter.get("/jobseekerapplications",isAutherized, jobseekerGetAllApplications)
applicationRouter.delete("/deleteaplication/:id",isAutherized, deletApplication)


export default applicationRouter