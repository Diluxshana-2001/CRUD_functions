const express = require("express");
const connectDB = require("./config/db");
const app = express();
const bookRoutes = require("./routes/bookRoutes");

const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");

connectDB().then(()=>{
    console.log("DB connection test ok!");
});
const PORT = 8080;
app.use(express.json());

app.use("/uploads",uploadRoutes);
app.use("/Books",bookRoutes);

app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.listen(PORT, () => {
  console.log(` Server running on Port ${PORT}`);
});

