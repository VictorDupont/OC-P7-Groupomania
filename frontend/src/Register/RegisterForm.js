import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./RegisterForm.scss";

class RegisterForm extends Component {
	state = {
		fields: {
			email: "",
			username: "",
			password: "",
		},
		errors: {},
	};

	handleValidation() {
		let { fields } = this.state;
		let formIsValid = true;
		let errors = {};

		if (!fields["email"]) {
			errors["email"] = "Veuillez renseigner une adresse email";
		} else if (!fields["email"].match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i)) {
			errors["email"] = "L'adresse email renseignée n'est pas valide";
		}

		if (!fields["username"]) {
			errors["username"] = "Veuillez renseigner un nom d'utilisateur";
		} else if (fields["username"].length < 3) {
			errors["username"] = "Le nom d'utilisateur doit contenur au minimum 3 caractères";
		} else if (fields["username"].length > 20) {
			errors["username"] = "Le nom d'utilisateur doit contenir au maximum 20 caractères";
		}

		if (
			!/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
				fields["password"]
			)
		) {
			errors["password"] =
				"Le mot de passe doit contenir minimum 8 caractères, 1 miniscule, 1 majuscule, 1 chiffre et 1 caractère spécial (!@#$%^&*)";
		}

		if (Object.keys(errors).length !== 0) {
			formIsValid = false;
		}
		this.setState({ errors });

		return formIsValid;
	}

	handleFormSubmit = (event) => {
		event.preventDefault();
		if (this.handleValidation()) {
			let { fields } = this.state;
			axios
				.post("http://localhost:3000/api/auth/signup", {
					email: fields["email"],
					username: fields["username"],
					password: fields["password"],
				})
				.then((res) => {
					const date = new Date();
					date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
					document.cookie =
						"token=" +
						res.data.token +
						"; expires=" +
						date.toUTCString() +
						"; path=/; SameSite=Strict";
					window.location.href = "/";
				})
				.catch((err) => {
					let errors = {};
					for (let error of err.response.data.error.errors) {
						errors[error.path] = error.message;
					}
					this.setState({ errors });
				});
		}
	};

	handleChange = (event) => {
		let { fields } = this.state;
		fields[event.target.name] = event.target.value.trim();
		this.setState({
			fields,
		});
	};

	render() {
		let { errors } = this.state;

		return (
			<form action="" method="post" noValidate onSubmit={this.handleFormSubmit}>
				{errors["g"] ? <div className="login-form__errors">{errors["g"]}</div> : ""}

				<label htmlFor="email" className="register-form__label">
					Email
				</label>
				<input
					type="email"
					name="email"
					id="email"
					className="register-form__input"
					value={this.state.fields["email"]}
					onChange={this.handleChange}
				/>
				{errors["email"] ? (
					<span className="login-form__error">{errors["email"]}</span>
				) : (
					""
				)}

				<label htmlFor="username" className="register-form__label">
					Nom d'utilisateur
				</label>
				<input
					type="text"
					name="username"
					id="username"
					className="register-form__input"
					value={this.state.fields["username"]}
					onChange={this.handleChange}
				/>
				{errors["username"] ? (
					<span className="login-form__error">{errors["username"]}</span>
				) : (
					""
				)}

				<label htmlFor="password" className="register-form__label">
					Mot de passe
				</label>
				<input
					type="password"
					name="password"
					id="password"
					className="register-form__input"
					value={this.state.fields["password"]}
					onChange={this.handleChange}
				/>
				{errors["password"] ? (
					<span className="login-form__error">{errors["password"]}</span>
				) : (
					""
				)}

				<p className="register-form__legal-requirements">
					En vous inscrivant, vous acceptez les
					<Link to="/register"> Conditions d'utilisation</Link>
				</p>

				<input type="submit" value="S'inscrire" className="register-form__submit" />
			</form>
		);
	}
}

export default RegisterForm;
