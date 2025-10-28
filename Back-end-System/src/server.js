const express = require("express");
require("dotenv").config();
const app = express();
const authRoutes = require("./routes/authRoutes")
const expenseRoutes = require("./routes/expenseRoutes")
const incomeRoutes = require("./routes/incomeRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const connectDB = require("./config/db");

app.use(express.json());
connectDB();



app.use("/api/auth",authRoutes);
app.use("/api/expenses",expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/summary", summaryRoutes);

app.get("/",(req,res)=>{
    res.send("hello its started..");
});
const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
  console.log(`server running in the ${PORT}`);
})