import express from "express";
import cors from "cors";
import suggestionRoutes from "../api/routes/suggestionRoutes";
import companyRoutes from "../api/routes/companyRoutes";
import statusRoutes from "../api/routes/statusRoutes";
import agentRoutes from "../api/routes/agentRoutes";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use("/api", suggestionRoutes);
app.use("/api", companyRoutes);
app.use("/api", statusRoutes);
app.use("/api", agentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
