require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Specify the model

async function calculateATSScore(resumeText, jobDescription) {
  const prompt = `
    Evaluate the following resume against the job description and provide an ATS score from 0 to 100.
    
    Resume:
    ${resumeText}
    
    Job Description:
    ${jobDescription}
    
    Provide a score and a brief explanation of the score.
    `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Extract the score from the response
    const scoreMatch = responseText.match(/Score: (\d+)/);
    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;

    return {
      score: score,
      // explanation: responseText, // You can also return the full explanation if needed
    };
  } catch (error) {
    console.error("Error calculating ATS score:", error);
    throw new Error("Failed to calculate ATS score with AI model.");
  }
}

module.exports = { calculateATSScore };
