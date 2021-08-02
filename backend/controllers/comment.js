const db = require("../models");

exports.deleteComment = (req, res, next) => {
	if (res.locals.userRoles.includes("ADMIN")) {
		db.Comment.destroy({ where: { id: req.params.id } })
			.then(() => res.status(200).json({ message: "Le post a bien été supprimé" }))
			.catch((error) => res.status(404).json({ error }));
	} else {
		return res.status(403).json({
			error: "Vous n'êtes pas administrateur de Groupomania et ne pouvez donc pas effectuer cette action",
		});
	}
};

exports.createComment = (req, res, next) => {
	db.Post.findOne({ where: { id: req.body.postId } })
		.then((post) => {
			if (!post) {
				return res.status(404).json({ error: "Le post n'existe pas" });
			}

			db.Comment.create({
				message: req.body.message,
				ownerId: res.locals.userId,
				postId: post.id,
			})
				.then((comment) => res.status(201).json({ comment }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(400).json({ error }));
};
