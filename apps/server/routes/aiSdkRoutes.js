import { openai } from "@ai-sdk/openai";
import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config()


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
const router = express.Router();

router.post("/api/ai-sdk", async (req, res, next) => {

  const { message } = req.body;
  const result = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }]
  });

  return res.json({ response: result.choices[0].message.content });
});

export default router;
