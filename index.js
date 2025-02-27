require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const setupSwagger = require("./swaggerConfig");
const cookieparsers = require("cookie-parser");
const { consoleLogCustom } = require("./utilities/utilities");

const userRoutes = require("./Routes/User");
const tokenRoutes = require("./Routes/Token");

//**DB CONNECTION */
mongoose
	.connect(process.env.DB_CONNECTION)
	.then(() => {
		consoleLogCustom(
			`[Connection Status ✔] ~`,
			"orange",
			` Connected To Database`,
			"purple"
		);
		consoleLogCustom(
			`[Database Info] ~`,
			"orange",
			` ${process.env.DB_CONNECTION.split("/")[3]}`,
			"purple"
		);
	})
	.catch((err) =>
		consoleLogCustom(
			"[Connection Status❌] ~ MongoDB connection error:" + err,
			"red"
		)
	);

const app = express();
setupSwagger(app);
app.use(express.json());
app.use(cookieparsers());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // ✅ Allow frontend URL
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.header("Access-Control-Allow-Credentials", "true"); // ✅ Allow cookies & headers

	// ✅ Handle preflight requests
	if (req.method === "OPTIONS") {
		return res.status(200).end();
	}

	next();
});

//**ROUTE SECTION */
app.use("/api/users", userRoutes);
app.use("/api/auth", tokenRoutes);



app.listen(process.env.PORT_NUMBER, () =>
	consoleLogCustom(
		`[Server Info] ~`,
		"orange",
		`http//localhost:${process.env.PORT_NUMBER}`,
		"purple"
	)
);
