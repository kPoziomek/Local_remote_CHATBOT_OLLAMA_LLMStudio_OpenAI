import express from "express";
import ollama from 'ollama'
const router = express.Router();
import dotenv from "dotenv";
dotenv.config()

const modelConfig = {
  modelId: "qwen3:1.7b",
  apiBase: "http://127.0.0.1:1234/v1",
  modelName: process.env.OLLAMA_MODEL || "qwen/qwen3-1.7b",
};

router.post("/api/model", async (req, res, next) => {
  const { message } = req.body;

  try {
    const response = await ollama.chat({
      model: modelConfig.modelName,
      messages: [{ role: "user", content: message }],
    });
    return res.json({ response: response.message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error querying the model" });
  }
});

export default router;
