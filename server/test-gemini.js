const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
    // There isn't a direct listModels method on the client instance in some versions, 
    // but let's try a simple generation to verify the key and model.
    console.log("Testing model: gemini-1.5-flash-001");
    const result = await model.generateContent("Hello, are you working?");
    const response = await result.response;
    console.log("Response:", response.text());
    console.log("SUCCESS: API Key and Model are working.");
  } catch (error) {
    console.error("Error:", error.message);
    console.log("\nPOSSIBLE FIXES:");
    console.log("1. Check if GEMINI_API_KEY is correct in .env");
    console.log("2. Ensure you have enabled the 'Google Generative AI API' in your Google Cloud Console.");
    console.log("3. Verify that 'gemini-1.5-flash-001' is available in your region.");
  }
}

listModels();
