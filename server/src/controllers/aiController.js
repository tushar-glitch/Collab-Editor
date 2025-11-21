const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.grammarCheck = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ msg: 'No text provided' });

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});
    const prompt = `Check the following text for grammar and style errors. Provide a corrected version and briefly explain the changes. Text: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();

    res.json({ suggestion: textResponse });
  } catch (err) {
    console.error('AI Error:', err);
    res.status(500).send('AI Service Error');
  }
};

exports.summarize = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ msg: 'No text provided' });

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});
    const prompt = `Summarize the following text concisely: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();

    res.json({ summary: textResponse });
  } catch (err) {
    console.error('AI Error:', err);
    res.status(500).send('AI Service Error');
  }
};

exports.complete = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ msg: 'No text provided' });

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});
    const prompt = `Complete the following text naturally: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();

    res.json({ completion: textResponse });
  } catch (err) {
    console.error('AI Error:', err);
    res.status(500).send('AI Service Error');
  }
};
