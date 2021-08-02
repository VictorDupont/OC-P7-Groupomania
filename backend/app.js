require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");

const app = express();
const db = require("./models");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const userRoutes = require("./routes/user");

app.use(helmet());

const corsOptions = {
	origin: "http://localhost:3001",
	allowedHeaders: "Origin,X-Requested-With,Content,Accept,Content-Type,Authorization",
};
app.use(cors(corsOptions));

db.sequelize
	.authenticate()
	.then(() => {
		console.log("Connexion à la base de données : OK");
	})
	.catch((error) => {
		console.log(
			"Il semblerait qu'il y ait eu une erreur d'authentification à la base de données : ",
			error
		);
	});

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
