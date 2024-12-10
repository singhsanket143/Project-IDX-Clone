import { createProjectService, getProjectTreeService } from "../service/projectService.js";

export const createProjectController = async (req, res) => {

    const projectId = await createProjectService();

    return res.json({ message: 'Project created', data: projectId });
}

export const getProjectTree = async (req, res) => {
    const tree = await getProjectTreeService(req.params.projectId);
    return res.status(200).json({
        data: tree,
        success: true,
        message: "Successfully fetched the tree"
    })
}