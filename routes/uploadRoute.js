const { google } = require("googleapis");
const { authenticate } = require("google-auth-library");
const fs = require("fs");
const multer = require("multer");
const package = require("../middlewares/package");
const requiredLogin = require("../middlewares/requiredLogin");

// Define the storage for uploaded files
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Set the filename for the uploaded file
  },
});
// Initialize multer with the storage configuration
const upload = multer({ storage });

module.exports = (app) => {
  app.post(
    "/api/upload", requiredLogin, upload.single("file"), async (req, res) => {

      if (!req.file) {
        return res.status(404).json(package(16, "No file uploaded.", null));
      }

      const uploadedFile = req.file;
      const filePath = uploadedFile.path;

      // Load the credentials.json file you downloaded earlier
      const credentials = require("../config/credentials.json");

      try {
        // Authenticate with Google Drive using the service account credentials
        const auth = new google.auth.GoogleAuth({
          credentials,
          scopes: ["https://www.googleapis.com/auth/drive.file"],
        });

        const drive = google.drive({ version: "v3", auth });

        const fileMetadata = {
          name: uploadedFile.originalname,
          parents: ["1rHOWddOZDuxMsoJ4YvJ4A-acRGRzJt52"],
        };

        const media = {
          mimeType: uploadedFile.mimetype,
          body: fs.createReadStream(filePath),
        };

        // Upload the file to Google Drive
        const driveResponse = await drive.files.create({
          resource: fileMetadata,
          media,
          fields: "id",
        });

        const fileId = driveResponse.data.id;

        // Set the file's permissions to make it public
        await drive.permissions.create({
          fileId,
          requestBody: {
            role: "reader",
            type: "anyone",
          },
        });
        const publicUrl = `https://drive.google.com/file/d/${fileId}/view`;

        // Respond with a success message or any other data you need
        res
          .status(200)
          .json(package(
            0,
            "File uploaded to Google Drive successfully.",
            publicUrl
          ));
          
      } catch (error) {
        res
          .status(500)
          .json(package(17, "An error occurred while uploading to Google Drive.", error));
      }
    }
  );

  app.get("/api/upload", (req, res) => {
    res.status(200).json(package(0, "Upload route is working on POST method.", null));
  });
};
