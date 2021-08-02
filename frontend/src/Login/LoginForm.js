import React, { Component } from "react";
import axios from "axios";

import "./LoginForm.scss";

class LoginForm extends Component {
	state = {
		fields: {
			email: "",
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

		if (!fields["password"]) {
			errors["password"] = "Veuillez renseigner un mot de passe";
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
				.post("http://localhost:3000/api/auth/login", {
					email: fields.email,
					password: fields.password,
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
					if (err.response.data.error.errors) {
						for (let error of err.response.data.error.errors) {
							errors[error.path] = error.message;
						}
					} else if (err.response.data.error) {
						errors["g"] = err.response.data.error;
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

				<label htmlFor="email" className="login-form__label">
					Email
				</label>
				<input
					type="email"
					name="email"
					id="email"
					className="login-form__input"
					value={this.state.fields["email"]}
					onChange={this.handleChange}
				/>
				{errors["email"] ? (
					<span className="login-form__error">{errors["email"]}</span>
				) : (
					""
				)}

				<label htmlFor="password" className="login-form__label">
					Mot de passe
				</label>
				<input
					type="password"
					name="password"
					id="password"
					className="login-form__input"
					value={this.state.fields["password"]}
					onChange={this.handleChange}
				/>
				{errors["password"] ? (
					<span className="login-form__error">{errors["password"]}</span>
				) : (
					""
				)}

				<input type="submit" value="Se connecter" className="login-form__submit" />
			</form>
		);
	}
}

export default LoginForm;
