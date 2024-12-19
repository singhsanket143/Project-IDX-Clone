import express from 'express';
import { createProjectController, getAllProjectsController, getProjectTree } from '../../controllers/projectController.js';

const router = express.Router();

router.post('/', createProjectController);

router.get('/:projectId/tree', getProjectTree);

router.get("/", getAllProjectsController);

export default router;