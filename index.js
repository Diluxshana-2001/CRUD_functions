const express = require("express");
const connectDB = require("./config/db");
const app = express();
const bookRoutes = require("./routes/bookRoutes");

connectDB().then(()=>{
    console.log("DB connection test ok!");
});
const PORT = 8080;
app.use(express.json());
app.use("/Books",bookRoutes);

app.listen(PORT, () => {
  console.log(` Server running on Port ${PORT}`);
});

