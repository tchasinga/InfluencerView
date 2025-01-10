import Aply from "../models/aply.model.js";
// Create Sharing model in the database
export const createSharing = async (req, res, next) => {
    try {
      const sharing = await Aply.create(req.body);
      res.status(201).json({
        success: true,
        data: sharing,
        message: "Create Sharing successfully",
      });

    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to create sharing table",
      });
    }
  };

// Retrieve all Sharing from the database
export const getSharing = async (req, res, next) => {
    try {
      const sharing = await Aply.find();
      res.status(200).json({
        success: true,
        data: sharing,
        message: "Get all Sharing successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to get all Sharing",
      });
    }
  };

// Retrieve Sharing by id from the database
export const getSharingById = async (req, res, next) => {
    try {
      const sharing = await Aply.findById(req.params.id);
      res.status(200).json({
        success: true,
        data: sharing,
        message: "Get Sharing by id successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to get Sharing by id",
      });
    }
  };
