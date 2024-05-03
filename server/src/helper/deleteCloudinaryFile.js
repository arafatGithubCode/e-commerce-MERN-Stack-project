// https://res.cloudinary.com/dlswlzccr/image/upload/v1714737965/e-commerce-mern/hmsncdue03pqghqn9krw.png

const cloudinary = require("../config/cloudinary");

const publicIDWithoutExtensionFromUrl = async (imageUrl) => {
  try {
    const pathSegments = imageUrl.split("/");
    //get the last segment or public id -> hmsncdue03pqghqn9krw.png
    const lastSegment = pathSegments[pathSegments.length - 1];
    const valueWithoutExtension = lastSegment.replace(/\.(jpeg|jpg|png)$/i, "");

    return valueWithoutExtension;
  } catch (error) {
    throw error;
  }
};

const deleteFileFromCloudinary = async (folderName, publicID, modelName) => {
  try {
    const { result } = await cloudinary.uploader.destroy(
      `${folderName}/${publicID}`
    );

    if (result !== "ok") {
      throw new Error(
        `This ${modelName} image could not delete from cloudinary`
      );
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { publicIDWithoutExtensionFromUrl, deleteFileFromCloudinary };
