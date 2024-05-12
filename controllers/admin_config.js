import Resource from "../models/resource_schema.js";
import { uploadImage } from "../controllers/uploadControllers.js";

const addResource = async (req, res) => {
  try {
    // Extract data from the request body
    const { name, category, link, description, image } = req.body;

    // Create a new resource object
    const newResource = new Resource({
      name,
      category,
      link,
      description,
      image,
    });

    // Save the resource to the database
    const savedResource = await newResource.save();

    // Send a success response
    res.status(201).json(savedResource);
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: error.message });
  }
};
const updateResource = async (req, res) => {
  try {
    // Extract resource ID from the request parameters
    const resourceId = req.params.id;

    // Find the resource by ID in the database
    let resource = await Resource.findById(resourceId);

    // If resource not found, return 404 status
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    // Update resource fields with new values from request body
    resource.name = req.body.name || resource.name;
    resource.category = req.body.category || resource.category;
    resource.link = req.body.link || resource.link;
    resource.description = req.body.description || resource.description;

    // Save the updated resource to the database
    const updatedResource = await resource.save();

    // Send a success response with the updated resource
    res.status(200).json(updatedResource);
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: error.message });
  }
};
const deleteResource = async (req, res) => {
  try {
    // Extract resource ID from the request parameters
    const resourceId = req.params.id;

    // Find the resource by ID in the database
    const resource = await Resource.findById(resourceId);

    // If resource not found, return 404 status
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    // Delete the resource from the database
    await resource.remove();

    // Send a success response
    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: error.message });
  }
};

const admin_config = {
  addResource,
  updateResource,
  deleteResource,
};
export default admin_config;