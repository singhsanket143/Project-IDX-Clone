export const setPermissions = async (path, permissions = "0644") => {
  try {
      await fs.chmod(path, permissions);
      console.log(`Permissions set: ${permissions} for ${path}`);
  } catch (error) {
      console.error("Error setting permissions", error);
      throw error;
  }
};