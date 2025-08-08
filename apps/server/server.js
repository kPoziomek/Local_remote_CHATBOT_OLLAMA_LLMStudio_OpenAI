import express from "express";
import cors from "cors";


import modelRoutes from "./routes/modelRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import aiSdkRoutes from "./routes/aiSdkRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(modelRoutes);
app.use(agentRoutes);
app.use(aiSdkRoutes);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
