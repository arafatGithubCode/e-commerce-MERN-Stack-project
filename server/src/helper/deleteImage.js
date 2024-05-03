const fs = require("fs").promises;

const deleteImage = async (userImagePath) => {
  try {
    await fs.access(userImagePath);
    await fs.unlink(userImagePath);
    console.log("image deleted successfully!");
  } catch (error) {
    console.error("image does not exist!");
  }
};

module.exports = { deleteImage };
