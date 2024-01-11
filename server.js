const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
	console.log(`UNCAUGHT EXCEPTION! 💥 Shutting down...`);
	console.log(err.name + ":");
	console.log(err.message);
	console.log(err.stack);
	process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

// Look for database and password in env., else go to config file
let DB;
if (process.env.DATABASE && process.env.DATABASE_PASSWORD) {
	DB = process.env.DATABASE.replace(
		"<PASSWORD>",
		process.env.DATABASE_PASSWORD
	);
} else {
	const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));
	DB = config.database.connectionString.replace(
		"<PASSWORD>",
		config.database.password
	);
}

mongoose
	.connect(DB)
	.then(() => console.log("DB connection successful"))
	.catch((err) => {
		console.error("Database Connection error");
		if (process.env.NODE_ENV.trim() === "development") console.error(err);
	});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
	console.log(`UNHANDLED REJECTION! 💥 Shutting down...`);
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
