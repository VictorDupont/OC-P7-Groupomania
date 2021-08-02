"use strict";

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			id: {
				type: DataTypes.INTEGER(11).UNSIGNED,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			email: {
				type: DataTypes.STRING(180),
				allowNull: false,
				unique: true,
				validate: {
					notNull: {
						msg: "Veuillez renseigner une adresse email",
					},
					notEmpty: {
						msg: "Veuillez renseigner une adresse email",
					},
					isEmail: {
						msg: "Le format de l'adresse email renseignée n'est pas valide",
					},
					async isUnique(email) {
						const user = await User.findOne({ where: { email: email } });
						if (user) {
							throw new Error("L'adresse email renseignée existe déjà");
						}
					},
				},
			},
			username: {
				type: DataTypes.STRING(20),
				allowNull: false,
				unique: true,
				validate: {
					notNull: {
						msg: "Veuillez renseigner un nom d'utilisateur",
					},
					isValidLength(username) {
						if (username.length < 3) {
							throw new Error(
								"Le nom d'utilisateur doit contenir au minimum 3 caractères"
							);
						} else if (username.length > 20) {
							throw new Error(
								"Le nom d'utilisateur doit contenir au maximum 20 caractères"
							);
						}
					},
					async isUnique(username) {
						const user = await User.findOne({ where: { username: username } });
						if (user) {
							throw new Error("Ce nom d'utilisateur existe déjà");
						}
					},
				},
			},
			roles: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "USER",
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
