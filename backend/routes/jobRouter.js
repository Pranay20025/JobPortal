import express from "express"
import { deleteJob, getAdminJob, getAllJobs, jobById, jobPost } from "../controller/jobController.js";
import isAuthenticated from "../middleware/authentication.js";

const jobRouter = express.Router();

jobRouter.post("/register",isAuthenticated, jobPost);
jobRouter.get("/get", getAllJobs);
jobRouter.get("/getadminjobs",isAuthenticated, getAdminJob);
jobRouter.get("/get/:id", jobById);
jobRouter.get("/delete/:id",isAuthenticated, deleteJob);

export default jobRouter;