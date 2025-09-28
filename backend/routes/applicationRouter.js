import express from "express"
import { applyJob, getApplicants, getappliedJobs, updateApplication, updatedApplication } from "../controller/applicationController.js";
import isAuthenticated from "../middleware/authentication.js";

const applicationRouter = express.Router();

applicationRouter.post("/apply/:id",isAuthenticated, applyJob);
applicationRouter.get("/get",isAuthenticated, getappliedJobs);
applicationRouter.get("/:id/applicants",isAuthenticated, getApplicants);
applicationRouter.post("/:jobId/updatestatus/:applicantId",isAuthenticated, updateApplication);
applicationRouter.get("/:jobId/updatedstatus",isAuthenticated, updatedApplication);

export default applicationRouter;