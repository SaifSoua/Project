const express = require("express");
const connectDB = require("./config/db");
const colors = require("colors");
const { errorHandler } = require("./middleware/error");
require("dotenv").config();

// Connect to database
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json()); // {"name": "Jhon Doe", "age":25}
app.use(express.urlencoded({ extended: false })); // name=John&age=25

app.use("/api/cardios", require("./routes/cardioRoute"));
app.use("/api/users", require("./routes/userRoute"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
