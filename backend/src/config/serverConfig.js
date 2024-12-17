import dotenv from 'dotenv';

dotenv.config();

export const getEnv = (key , defaultValue = null) => {
  try {
    
    const value = process.env[key];
    if(value === undefined || null) { // not persent then thorw Error
      throw new Error(`Environment variable "${key}" is not defined.`);
    }

    return value ; 
  } catch (error) {
    console.error(`Error retrieving environment variable: ${error.message}`);
    return defaultValue;
  }
}