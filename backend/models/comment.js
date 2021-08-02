"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate(models) {
			Comment.belongsTo(models.User, {
				foreignKey: "ownerId",
				onDelete: "CASCADE",
			});
			Comment.belongsTo(models.Post, {
				foreignKey: "postId",
				onDelete: "CASCADE",
			});
		}
	}
	Comment.init(
		{
			id: {
				type: DataTypes.INTEGER(11).UNSIGNED,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			message: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Veuillez renseigner un commentaire",
					},
					notEmpty: {
						msg: "Veuillez renseigner un commentaire",
					},
					isValidLength(message) {
						if (message.length > 170) {
							throw new Error("Le commentaire ne peut pas dépasser 170 caractères");
						}
					},
				},
			},
			ownerId: {
				type: DataTypes.INTEGER(11).UNSIGNED,
				allowNull: false,
			},
			postId: {
				type: DataTypes.INTEGER(11).UNSIGNED,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Veuillez renseigner l'id du post",
					},
					notEmpty: {
						msg: "Veuillez renseigner l'id du post",
					},
					isInt: true,
				},
			},
		},
		{
			sequelize,
			modelName: "Comment",
		}
	);
	return Comment;
};
