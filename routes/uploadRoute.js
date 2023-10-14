const admin = require("firebase-admin");
const package = require("../middlewares/package");
const requiredLogin = require("../middlewares/requiredLogin");
const multer = require('multer');
const bodyParser = require('body-parser');

// Account of Firebase
const serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "nodejs-final-8bdf4.appspot.com",
});

const upload = multer();

module.exports = (app) => {
 	app.post(
		"/api/users/upload",
		requiredLogin,
		upload.single("file"),
		async (req, res) => {
			
			if (!req.file || Object.keys(req.file).length === 0) {
				return res.status(400).send('No files were uploaded.');
			}

			const uploadedFile = req.file;

			const bucket = admin.storage().bucket();
			const destinationPath = `images/upload/${Date.now()}-${uploadedFile.originalname}`;

			// Upload the file to Firebase Cloud Storage
			const file = bucket.file(destinationPath);
			const stream = file.createWriteStream({
				metadata: {
				contentType: uploadedFile.mimetype,
				},
				public: true, // Make the file publicly accessible (optional)
			});

			stream.on("error", (error) => {
				console.error("Error uploading file:", error);
				res.status(500).json(package(500, "Error uploading file"));
			});

			stream.on("finish", () => {
				console.log("File uploaded successfully.");
				// Get the download URL
				file.getSignedUrl({
				action: "read",
				expires: "01-01-2100",
				})
				.then((urls) => {
					const downloadURL = urls[0];
					res.json(package(16, "Upload file successfully.", downloadURL));
				})
				.catch((error) => {
					console.error("Error getting download URL:", error);
					res.status(500).json(package(500, "Error getting download URL"));
				});
			});

			stream.end(uploadedFile.buffer);
		}
  	);

  app.get("/api/users/upload", (req, res) => {
    res
      .status(200)
      .json(package(0, "Upload route is working on POST method.", null));
  });
};
