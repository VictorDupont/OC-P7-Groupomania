const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			throw "Aucun token d'identification";
		}

		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
		const userId = decodedToken.userId;
		const userRoles = decodedToken.roles;

		if (req.body.userId && parseInt(req.body.userId, 10) !== userId) {
			throw "L'utilisateur n'est pas valide";
		} else {
			res.locals.userId = userId;
			res.locals.userRoles = userRoles;
			next();
		}
	} catch (error) {
		return res.status(400).json({ error });
	}
};
