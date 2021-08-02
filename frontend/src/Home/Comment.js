import React, { Component } from "react";
import axios from "axios";

import "./Comment.scss";

class Comment extends Component {
	handleDelete = () => {
		if (window.confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
			const value = `; ${document.cookie}`;
			const parts = value.split(`; token=`);
			const token = parts.pop().split(";").shift();

			axios
				.delete("http://localhost:3000/api/comments/" + this.props.comment.id, {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				.then(() => {
					this.props.deleteComment(this.props.comment.id);
				})
				.catch((err) => {
					console.log(err);
					window.alert(
						"Erreur survenue lors de la réalisation de cette action, veuillez réessayer. (Déconnectez-vous et reconnectez-vous si le problème persiste)"
					);
				});
		}
	};

	render() {
		return (
			<div className="comment">
				<div className="comment__body">
					<p className="comment__message">{this.props.comment.message}</p>
				</div>
				<div className="comment__footer">
					<p className="comment__owner">
						{new Date(this.props.comment.createdAt).toLocaleDateString() +
							" " +
							new Date(this.props.comment.createdAt).getHours() +
							":" +
							new Date(this.props.comment.createdAt).getMinutes() +
							", " +
							this.props.comment.User.username}
					</p>
					{this.props.user.roles && this.props.user.roles.includes("ADMIN") ? (
						<button href="#" className="comment__delete" onClick={this.handleDelete}>
							Supprimer
						</button>
					) : (
						""
					)}
				</div>
			</div>
		);
	}
}

export default Comment;
