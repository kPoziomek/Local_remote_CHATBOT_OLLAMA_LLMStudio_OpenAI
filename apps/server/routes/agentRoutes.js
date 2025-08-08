import express from "express";
import { LMStudioClient } from "@lmstudio/sdk";
import dotenv from "dotenv";
dotenv.config()
const router = express.Router();

router.post("/api/agent", async (req, res, next) => {
  const { message } = req.body;
  const client = new LMStudioClient();

  try {
    const model = await client.llm.model(process.env.LMSTUDIO_MODEL || "deepseek-r1-distill-llama-8b");
    const result = await model.respond(message);

    res.json({ response: result.nonReasoningContent});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error running the agent" });
  }
});

export default router;
