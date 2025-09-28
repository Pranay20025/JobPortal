import express from "express"
import { getCompany, getCompanyById, registerCompany, updateCompanyInfo } from "../controller/companyContoller.js";
import isAuthenticated from "../middleware/authentication.js";

const companyRouter = express.Router();

companyRouter.post("/add",isAuthenticated, registerCompany);
companyRouter.get("/get",isAuthenticated, getCompany);
companyRouter.get("/get/:id",isAuthenticated, getCompanyById);
companyRouter.put("/update/:id",isAuthenticated, updateCompanyInfo);

export default companyRouter;