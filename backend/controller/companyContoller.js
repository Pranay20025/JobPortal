import mongoose from "mongoose";
import  Company  from "../model/companyModel.js";

// Register a new company
const registerCompany = async (req, res) => {
  try {
    const { name, description, website, location} = req.body;

    if (!name || !description || !website || !location) {
      return res.status(400).json({ message: "Please enter company name" });
    }

    // Check if company already exists
    let company = await Company.findOne({ name });

    if (company) {
      return res.status(400).json({ message: "Company already exists" });
    }

    company = new Company({
      name,
      description,
      website,
      location,
      userId: req.id,
    });

    await company.save();

    return res.status(201).json({
      message: "Company created successfully",
      company,
      success: true,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
}

// Get all companies for a user
const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId: userId });

    if (companies.length === 0) {
      return res.status(404).json({ success: false, message: "No companies found" });
    }

    return res.status(200).json({ success: true, companies });

  } catch (error) {
    console.error('Error fetching companies:', error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
}


// Get a company by ID
const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    return res.status(200).json({ success: true, message: "Company retrieved", company });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
}

// Update company information
const updateCompanyInfo = async (req, res) => {
  try {
    const { name, website, location, description } = req.body;
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    company.name = name || company.name;
    company.website = website || company.website;
    company.location = location || company.location;
    company.description = description || company.description;

    await company.save();

    return res.status(200).json({ success: true, message: "Company Information Updated", company });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
}

export {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompanyInfo,
}
