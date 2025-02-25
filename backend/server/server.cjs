const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const bodyParser = require("body-parser");
const path = require("path");
const atsScoring = require("./utils/atsScoring.cjs");
const enhanceWithGemini = require("./utils/enhanceWithGemini.cjs");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

// CORS handling
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  next();
});

// Ensure uploads directory exists
const uploadDir = "/tmp/uploads"; // Use / tmp for Vercel deployment
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Use memory storage to avoid file system issues
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDFs are allowed."));
    }
  },
});

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint for Ats Score Check
app.post("/api/resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Parse the PDF directly from the buffer
    const resumeData = await pdfParse(req.file.buffer);
   
    const jobDescription = req.body.jobDescription || "";
    const role = req.body.role || "";

    await atsScoring
      .calculateATSScore(resumeData.text, jobDescription)
      .then((atsScore) => {
        res.json({ score: atsScore, role });
      });
  } catch (error) {
    console.error("Error processing the resume:", error);
    res.status(500).json({
      message: "Error processing the resume. Try again later.",
      error: error.message,
    });
  }
});

// Endpoint for Enhancing the Resume with AI
app.post("/api/enhance-resume", upload.single("resume"), async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Parse the PDF file to extract text
    const resumeData = await pdfParse(req.file.buffer);
    const jobTitle = req.body.jobTitle;

    // Call the AI model API to enhance the resume
    const enhancedResume = await enhanceWithGemini.callGeminiAPI(
      resumeData.text,
      jobTitle
    );

    // Return the enhanced resume
    res.json({ enhancedResume });
  } catch (error) {
    console.error("Error enhancing the resume:", error);
    res.status(500).json({
      message: "Error enhancing the resume. Try again later.",
      error: error.message,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
