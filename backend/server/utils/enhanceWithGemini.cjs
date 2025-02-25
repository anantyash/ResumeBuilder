require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Specify the model

// Function to call the AI model API
async function callGeminiAPI(resumeText, jobTitle) {
  const prompt = `Enhance the following resume for the job title "${jobTitle}":\n\n${resumeText}`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text(); // Return the enhanced resume text
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to enhance resume with AI model.");
  }
}

module.exports = { callGeminiAPI };
