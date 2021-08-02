import React, { Component } from "react";
import axios from "axios";

import "./NewCommentForm.scss";

class NewCommentForm extends Component {
	state = {
		fields: {
			message: "",
		},
		errors: {},
	};

	handleValidation() {
		let { fields } = this.state;
		let formIsValid = true;
		let errors = {};

		if (!fields["message"]) {
			errors["message"] = "Veuillez renseigner un commentaire";
		} else if (fields["message"].length > 200) {
			errors["message"] = "Le commentaire ne peut pas dépasser 170 caractères";
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
			let { message } = this.state.fields;

			const value = `; ${document.cookie}`;
			const parts = value.split(`; token=`);
			const token = parts.pop().split(";").shift();

			axios
				.post(
					"http://localhost:3000/api/comments",
					{
						message,
						postId: this.props.postId,
					},
					{
						headers: {
							Authorization: "Bearer " + token,
						},
					}
				)
				.then((res) => {
					const comment = res.data.comment;
					comment.User = { username: this.props.user.username };
					console.log(comment);
					this.props.addComment(comment);

					this.setState({ fields: { message: "" } });
				})
				.catch((err) => {
					console.log(err);
					let errors = {};
					errors["g"] = err.response.data.error;
					this.setState({ errors });
				});
		}
	};

	handleChange = (event) => {
		let { fields } = this.state;
		fields[event.target.name] = event.target.value;
		this.setState({
			fields,
		});
	};

	render() {
		let { errors } = this.state;

		return (
			<form action="" className="newcomment-form" onSubmit={this.handleFormSubmit}>
				<h2 className="newcomment-form__title">Ecrire un commentaire</h2>

				<div className="newcomment-form__input-group">
					<label
						htmlFor={"message" + this.props.postId}
						className="newcomment-form__label"
					>
						Votre commentaire : <span className="required">*</span>
					</label>
					<textarea
						name="message"
						id={"message" + this.props.postId}
						cols="30"
						rows="10"
						onChange={this.handleChange}
						value={this.state.fields["message"]}
						className="newcomment-form__textarea"
					/>
					{errors["message"] ? (
						<span className="newcomment-form__error">{errors["message"]}</span>
					) : (
						""
					)}
				</div>

				<input type="submit" value="Envoyer" className="newcomment-form__submit" />
			</form>
		);
	}
}

export default NewCommentForm;
