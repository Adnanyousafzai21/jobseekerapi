import { Router } from "express";
import  { deleteJob, getJobs, myJob, postJobs, singleJob, updateJob } from "../controllers/jobcontroller.js";
import isAutherized from "../middleware/auth.js";


const  jobrouter= Router()

jobrouter.post("/postJob",isAutherized, postJobs)
jobrouter.get("/getJob", getJobs)
jobrouter.post("/updateJob/:id",isAutherized, updateJob)
jobrouter.get("/myjob",isAutherized, myJob)
jobrouter.delete("/deleteJob/:jobid",isAutherized, deleteJob)
jobrouter.get("/getsingleJob/:singleId",isAutherized, singleJob)

export default jobrouter