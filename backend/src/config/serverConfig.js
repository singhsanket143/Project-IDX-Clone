import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const REACT_PROJECT_COMMAND = process.env.REACT_PROJECT_COMMAND;