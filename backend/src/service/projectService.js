import uuid4 from "uuid4";
import fs from 'fs/promises';
import { REACT_PROJECT_COMMAND } from '../config/serverConfig.js';
import { execPromisified } from "../utils/execUtility.js";
import path from 'path';
import directoryTree from "directory-tree";


export const createProjectService = async () => {
    // Create a unique id and then inside the projects folder create a new folder with that id
    const projectId = uuid4();
    console.log("New project id is", projectId);

    await fs.mkdir(`./projects/${projectId}`);

    // After this call the npm creaste vite command in the newly created project folder

    const response = await execPromisified(REACT_PROJECT_COMMAND, {
        cwd: `./projects/${projectId}`
    });

    return projectId;
}

export const getAllProjectsService = async () => {
    const projectsFolder = path.resolve("./projects");
    try {
      const files = await fs.readdir(projectsFolder);
      const directories = await Promise.all(
        files.map(async (file) => {
          const fullPath = path.join(projectsFolder, file);
          try {
            const stat = await fs.stat(fullPath);
            return stat.isDirectory() ? file : null;
          } catch (error) {
            console.error(`Error getting stats for file ${file}:`, error);
            return null;
          }
        })
      );
  
      return directories.filter(Boolean);
    } catch (error) {
      console.error("Error reading projects directory:", error);
      throw new Error("Unable to retrieve projects.");
    }
  };
  
export const getProjectTreeService = async (projectId) => {
    const projectPath = path.resolve(`./projects/${projectId}`);
    const tree = directoryTree(projectPath);
    return tree;
}