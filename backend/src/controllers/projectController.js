import { createProjectService, getAllProjectsService, getProjectTreeService } from "../service/projectService.js";

export const createProjectController = async (req, res) => {

    const projectId = await createProjectService();

    return res.json({ message: 'Project created', data: projectId });
}

export const getAllProjectsController = async (req, res) => {
    try {
      const projects = await getAllProjectsService();
      return res.status(200).json({
        success: true,
        data: projects,
        message: "Successfully fetched all projects",
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res
        .status(500)
        .json({ message: "Failed to fetch projects", error: error.message });
    }
  };

export const getProjectTree = async (req, res) => {
    const tree = await getProjectTreeService(req.params.projectId);
    return res.status(200).json({
        data: tree,
        success: true,
        message: "Successfully fetched the tree"
    })
}