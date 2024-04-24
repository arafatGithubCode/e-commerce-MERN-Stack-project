const fs = require("fs").promises;

// const deleteImage = (userImagePath) => {
//   fs.access(userImagePath)
//     .then(() => fs.unlink(userImagePath))
//     .then(() => console.log("User image deleted successfully!"))
//     .catch((err) => console.error("User image does not exist!"));
// };

// best practice
const deleteImage = async (userImagePath) => {
  try {
    await fs.access(userImagePath);
    await fs.unlink(userImagePath);
    console.log("User image deleted successfully!");
  } catch (error) {
    console.error("User image does not exist!");
  }
};

module.exports = { deleteImage };
