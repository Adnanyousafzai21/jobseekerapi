import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { v2 as cloudinary } from "cloudinary";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { application } from "express";
const ApplicationPost = async (req, res, next) => {

    const { role } = req.user

    if (role === "employeer") return res.status(400).send({ message: " employeer is not allowed to access this request" })

    if (!req.files) return res.status(404).send({ message: "please upload the resum file" })


    const resumelocal = req.files.resume

    const allowedfarmate =  ["image/png", "image/jpeg", "image/webp"]

    if(!allowedfarmate.includes(resumelocal.mimetype)) return res.status(400).send({message:"invalid image type please provide valid type"})

// console.log("resume is here",resumelocal)
const file = await uploadOnCloudinary(resumelocal.tempFilePath);
if(!file)return res.status(500).send({message:"file is not commminn frm cloudinary"})
const { name, email, coverLetter, phone, address, jobId } = req.body;
const applicantID = {
  user: req.user._id,
  role: "Job Seeker",
};
if (!jobId) {
    return res.status(404).send({message:"Job not found!"});
}
const jobDetails = await Job.findById(jobId);
if (!jobDetails) {
    return res.status(404).send({message:"Job not found!"});

}
// console.log(jobDetails)
const employerID = {
  user: jobDetails.postedBy,
  role: "Employer",
};
const  resume= {
    public_id: file.public_id,
    url: file.secure_url,
  }
if (
  !name ||
  !email ||
  !coverLetter ||
  !phone ||
  !address ||
  !applicantID ||
  !employerID ||
  !resume
) {
    return res.status(400).send({message:"Please fill all fields."});
}

const application = await Application.create({
  name,
  email,
  coverLetter,
  phone,
  address,
  applicantID,
  employerID,
 resume
});
res.status(200).json({
  success: true,
  message: "Application Submitted!",
  application,
});
}
const employeGetAllApplication = async (req, res, next)=>{
    const {role}= req.user
    if(role==="job seeker") return res.status(400).send({message:"job seeker can access this request"})

const {_id} = req.user
   const applications = await Application.find({"employerID.user" : _id})

   if(!applications) return res.status(500).send({message:"applicaiton not found"})
   res.status(200).send({success: true, applications})
}

const jobseekerGetAllApplications= async (req, res, next)=>{

    const {role}= req.user
    if(role==="employeer") return res.status(400).send({message:"employeer conn't access this request"})

    const {_id} =req.user
    const applications = await Application.find({"applicantID.user":_id})

    if(!applications) return res.staus(404).send({message:"applicaion not found!!"})

    res.status(200).send({success: true, applications})
}

const deletApplication = async (req, res, next)=>{
    const {id} = req.params

    const applicaiondelete = await Application.findByIdAndDelete(id)
    if(!applicaiondelete) return res.status(500).send({message:"appliaion is not deleted"})

    res.status(200).send({success: true , message:"applicaion deleted successfuly"})
}
export {ApplicationPost, employeGetAllApplication, jobseekerGetAllApplications, deletApplication}