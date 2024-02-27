import { Job } from "../models/job.model.js"

const getJobs = async (req, res, next) => {

  const allJobs = await Job.find()
  if (!allJobs) return res.status(500).send({ message: "jobs are not found yet" })
console.log("get all jobs",allJobs)
  res.status(200).send({ message: "jobs fetched successfuly", allJobs })
}




const postJobs = async (req, res, next) => {
  try {
    const { role } = req.user

    if (role === "job seeker") return res.status(400).send({ message: "you cannt post job with job seeker role" })


    const { title, description, category, salaryFrom, salaryTo, postedOn, city, country, } = req.body


    if (!title, !description, !category, !postedOn, !city, !country) {
      return res.status(400).send({ message: "please provide required details of the job " })
    }
    const postedBy = req.user._id
    const job = await Job.create({
      title,
      description,
      category,
      country,
      city,
      salaryFrom,
      salaryTo,
      postedBy,
      postedOn
    });
    res.status(200).json({
      success: true,
      message: "Job Posted Successfully!",
      job,
    });



  } catch (error) {
    console.log(error, "error while creating job post")
  }

}

const updateJob = async (req, res, next) => {

  const { id } = req.params

  const { role } = req.body
  if (role === "job seeker") return res.status(400).send({ meassge: ` the user with the ${role} is not allowed for this reques` })
  const updatedJob = await Job.findByIdAndUpdate(id, req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )

  if (!updatedJob) return res.status(500).send({ message: "the jobs with this request is not found" })

  res.status(200).send({ success: true, message: "job updated successfuly", updatedJob })
}

const myJob = async (req, res, next) => {
console.log("you hited the reequst to my hob")
  try {
    const { role } = req.user
    if (!role==="Employer") return res.status(400).send({ message: `you are not allowed for this request with the ${role} role` })
    const myjob = await Job.find({ postedBy: req.user._id })
    if (myjob.length == 0){
      console.log("oops job not found")
       return res.status(404).send({ message: " 'OOP'S' jobs not found" })
    }

    res.status(200).json({ success: true, myjob })

  } catch (error) {
    console.log(error.message)
  }


}

const deleteJob = async (req, res, next) => {

  try {
    const { jobid } = req.params

    const deletejob = await Job.findByIdAndDelete(jobid)
    if(!deletejob)return res.status(404).send({message:"the post you are reques to delete is not found"})

    res.status(200).send({message:"the job has been deleted"})

  } catch (error) {
    console.log(error.message)
  }
}

const singleJob = async (req, res, next)=>{
try{
  const {singleId}= req.params
  const singlejob = await Job.findById(singleId)
  if(!singlejob)return res.status(404).send({message:"' OOPS!' job is not found!!"})

  res.status(200).send({success:true, singlejob} )
}catch(error){
  console.log(error.message)
}
}

export { postJobs, getJobs, updateJob, myJob, deleteJob,singleJob }