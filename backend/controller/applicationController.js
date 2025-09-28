import mongoose from "mongoose";
import Application from "../model/applicationModel.js";
import Job from "../model/jobModel.js";

const applyJob = async (req, res) => {
  try {
    const userId = req.id;  // Ensure this is correctly set
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({ message: "Job id is required" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applied = await Application.findOne({ job: jobId, applicant: userId });
    if (applied) {
      return res.json({ message: "You have already applied for this job" });
    }

    const application = new Application({
      applicant: userId,
      job: jobId,
      status: "pending",
    });

    job.applications.push(application._id);
    await job.save();  // Save the updated job

    await application.save();  // Save the application

    res.status(201).json({ success: true, message: "Application submitted successfully" });

  } catch (error) {
    console.error("Error in applyJob:", error); // Log the error details
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getappliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const appliedJobs = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'job',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'company',
        }
      });

    if (appliedJobs.length === 0) {
      return res.status(404).json({ success: false, message: "Not applied to any job" });
    }

    return res.status(200).json({ success: true, message: "Jobs Applied", appliedJobs });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const applications = await Application.find({ job: jobId })
      .sort({ createdAt: -1 })
      .populate('applicant');

    if (applications.length === 0) {
      return res.status(404).json({ message: "No applicants found for this job" });
    }

    return res.status(200).json({ success: true, message: "Applicants retrieved successfully", applications });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const updateApplication = async (req, res) => {
  try {
    const { status } = req.body;  // Extract status from req.body
    const userId = req.id;
    const jobId = req.params.jobId;
    const applicantId = req.params.applicantId;

    // Find application by jobId and userId
    const application = await Application.findOne({ job: jobId, applicant: applicantId });

    if (!status) {
      return res.status(400).json({ success: false, message: "Please provide status" });
    }

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;  // Update status
    await application.save();

    res.status(200).json({ message: "Application updated successfully", application });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
}

const updatedApplication = async (req, res) =>{
  try {
    const userId = req.id;
    const jobId = req.params.jobId;

    const application = await Application.findOne({ job: jobId , applicant: userId});

    if(!application){
      return res.status(404).json({ message: "Application not found" });
    }

    return res.status(200).json({success: true, message:"Application updated successfully", status: application.status})

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
}

export { applyJob, updateApplication, getApplicants, getappliedJobs,  updatedApplication  };
