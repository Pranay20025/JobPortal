import mongoose from "mongoose";
import Job from "../model/jobModel.js";

const jobPost = async (req,res)=>{
  try {
    const {title, description, salary, location, jobType, position, experience, requirements, companyId } = req.body;
    const userId = req.id;

    if (!title || !description || !salary || !location || !jobType || !position || !experience || !requirements || !companyId ) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
  
  const job = new Job({
      title,
      description,
      salary: Number(salary),
      location,
      jobType,
      position,
      experience: Number(experience),
      requirements: requirements.split(",").map(req => req.trim()), 
      companyId,
      createdBy: userId,
    })

    await job.save();

    res.status(201).json({ message: "Job posted successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

const getAllJobs = async (req,res) =>{
  try {
    
    const Jobs = await Job.find();

    if(Jobs.length == 0){
      return res.status(404).json({ message: "No jobs found" });
    }

    return res.status(200).json({success: true, Jobs});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

const getAdminJob = async (req,res) =>{
  try {
    const adminId = req.id;

    const Jobs = await Job.find({ createdBy: adminId});

    if(Jobs.length == 0){
      return res.status(404).json({ message: "No jobs found" });
    }

    return res.status(200).json({success: true, Jobs});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

const jobById = async (req,res) =>{
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
   
    if(!job){
      return res.status(404).json({success: false, message:"Job Does not exists"});
    }
    
    return res.status(200).json({success: true, job});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findByIdAndDelete(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    return res.status(200).json({ success: true, message: "Job deleted successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
}


export {
jobPost,
getAdminJob,
jobById,
getAllJobs,
deleteJob,
}