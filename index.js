require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/User");
const setupSwagger = require("./swaggerConfig");
const cookieparsers = require("cookie-parser");
const { consoleLogCustom } = require("./utilities/utilities");

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

//**ROUTE SECTION */
app.use("/api/users", userRoutes);

app.use(cors());

app.listen(process.env.PORT_NUMBER, () =>
	consoleLogCustom(
		`[Server Info] ~`,
		"orange",
		`http//localhost:${process.env.PORT_NUMBER}`,
		"purple"
	)
);
