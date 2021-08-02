import React, { Component } from "react";
import axios from "axios";

import "./NewPostForm.scss";

class NewPostForm extends Component {
	state = {
		fields: {
			content: "",
		},
		errors: {},
	};

	fileExtensions = ["gif", "jpg", "jpeg", "png"];

	constructor(props) {
		super(props);
		this.imageInput = React.createRef();
		this.newPostForm = React.createRef();
	}

	handleValidation() {
		let { fields } = this.state;
		let formIsValid = true;
		let errors = {};

		if (!fields["content"]) {
			errors["content"] = "Veuillez renseigner un post";
		}

		if (
			this.imageInput.current.value &&
			!this.fileExtensions.includes(this.imageInput.current.value.split(".")[1].toLowerCase())
		) {
			errors["image"] = "Formats d'image acceptés : " + this.fileExtensions.join(", ");
		}

		if (Object.keys(errors).length !== 0) {
			formIsValid = false;
		}
		this.setState({ errors });

		return formIsValid;
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if (this.handleValidation()) {
			let { content } = this.state.fields;

			const value = `; ${document.cookie}`;
			const parts = value.split(`; token=`);
			const token = parts.pop().split(";").shift();

			let formData = new FormData();
			formData.append("content", content);
			formData.append("image", this.imageInput.current.files[0]);

			axios
				.post("http://localhost:3000/api/posts", formData, {
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "multipart/form-data",
					},
				})
				.then((res) => {
					const post = res.data.post;
					post.User = { username: this.props.user.username };
					this.props.addPost(post);

					this.newPostForm.current.reset();
					this.setState({ fields: { content: "" } });
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
		this.setState({ fields });
	};

	render() {
		let { errors } = this.state;
		return (
			<form
				action=""
				className="newpost-form"
				onSubmit={this.handleSubmit}
				ref={this.newPostForm}
			>
				<h2 className="newpost-form__title">Création de post</h2>

				<div className="newpost-form__input-group">
					<label htmlFor="content" className="newpost-form__label">
						Post : <span className="required">*</span>
					</label>
					<textarea
						name="content"
						id="content"
						cols="30"
						rows="10"
						className="newpost-form__textarea"
						value={this.state.fields["content"]}
						onChange={this.handleChange}
					/>
					{errors["content"] ? (
						<span className="newpost-form__error">{errors["content"]}</span>
					) : (
						""
					)}
				</div>

				<div className="newpost-form__input-group">
					<label htmlFor="image" className="newpost-form__label">
						Joindre une image :
					</label>
					<input
						type="file"
						name="image"
						id="image"
						ref={this.imageInput}
						className="newpost-form__file-upload"
					/>
					{errors["image"] ? (
						<span className="newpost-form__error">{errors["image"]}</span>
					) : (
						""
					)}
				</div>

				<input type="submit" value="Envoyer" className="newpost-form__submit" />
			</form>
		);
	}
}

export default NewPostForm;
