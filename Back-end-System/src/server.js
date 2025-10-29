

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const connectDB = require("./config/db");

app.use(express.json());

// ✅ Enable CORS for frontend (5173)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/summary", summaryRoutes);

app.get("/", (req, res) => {
  res.send("hello its started..");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

