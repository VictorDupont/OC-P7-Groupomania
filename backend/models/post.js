"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		static associate(models) {
			Post.belongsTo(models.User, {
				foreignKey: "ownerId",
				onDelete: "CASCADE",
			});
		}
	}
	Post.init(
		{
			id: {
				type: DataTypes.INTEGER(11).UNSIGNED,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Veuillez renseigner un post",
					},
					notEmpty: {
						msg: "Veuillez renseigner un post",
					},
					isValidLength(content) {
						if (content.length > 700) {
							throw new Error(
								"Le post ne peut contenir qu'au maximum 700 caractères"
							);
						}
					},
				},
			},
			image: {
				type: DataTypes.STRING,
			},
			ownerId: {
				type: DataTypes.INTEGER(11).UNSIGNED,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Post",
		}
	);
	return Post;
};
