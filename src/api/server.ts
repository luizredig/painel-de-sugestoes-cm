import express from "express";
import cors from "cors";
import suggestionRoutes from "../api/routes/suggestionRoutes.ts";
import companyRoutes from "../api/routes/companyRoutes.ts";
import statusRoutes from "../api/routes/statusRoutes.ts";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/api", suggestionRoutes);
app.use("/api", companyRoutes);
app.use("/api", statusRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
