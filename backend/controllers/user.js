const db = require("../models");

exports.deleteCurrentUser = (req, res, next) => {
	db.User.destroy({ where: { id: res.locals.userId } })
		.then(() => res.status(200).json({ message: "L'utilisateur a bien été supprimé" }))
		.catch((error) => res.status(404).json({ error }));
};
