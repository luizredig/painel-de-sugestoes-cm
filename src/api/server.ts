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
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use("/api", suggestionRoutes);
app.use("/api", companyRoutes);
app.use("/api", statusRoutes);
app.use("/api", agentRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5174");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
