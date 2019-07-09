const express = require("express");
const config = require("config");

const { connectDb } = require("./db/connectDb");
const apiRoutes = require("./routes/apiRoutes");
const mainRoutes = require("./routes");

const app = express();

// Connect to the Database
connectDb();

// to accepting JSON request body
app.use(express.json());

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
});

app.use("/", mainRoutes);
app.use("/api", apiRoutes);

const PORT = config.get("PORT") || 8000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
