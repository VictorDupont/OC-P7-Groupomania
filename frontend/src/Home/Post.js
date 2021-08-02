import React, { Component } from "react";
import axios from "axios";

import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";
import "./Post.scss";
import profilePic from "./OpenClassrooms.png";

class Post extends Component {
	state = {
		comments: [],
	};

	componentDidMount() {
		this.getAllComments();
	}

	getAllComments() {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; token=`);
		const token = parts.pop().split(";").shift();

		axios
			.get(
				"http://localhost:3000/api/posts/" +
					this.props.post.id +
					"/comments?sort=createdAt&order=asc&include=user",
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			)
			.then((res) => {
				this.setState({ comments: res.data });
			})
			.catch((err) => {
				console.log(err);
				window.alert("Erreur survenue, veuillez réessayer ou reconnectez-vous");
			});
	}

	addComment(comment) {
		let { comments } = this.state;
		comments.push(comment);
		this.setState({ comments });
	}

	handlePostDelete = (event) => {
		if (window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
			const value = `; ${document.cookie}`;
			const parts = value.split(`; token=`);
			const token = parts.pop().split(";").shift();

			axios
				.delete("http://localhost:3000/api/posts/" + this.props.post.id, {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				.then(() => {
					this.props.deletePost(this.props.post.id);
				})
				.catch((err) => {
					console.log(err);
					window.alert("Erreur survenue, veuillez réessayer ou reconnectez-vous");
				});
		}
	};

	deleteComment(commentId) {
		let { comments } = this.state;
		comments = comments.filter((comment) => comment.id !== commentId);
		this.setState({ comments });
	}

	render() {
		let { comments } = this.state;

		return (
			<div className="post">
				<div className="post__header">
					<img src={profilePic} alt="" className="post__profile-picture" />
					<div>
						<p className="post__fullname">{this.props.post.User.username}</p>
						<time
							className="post__creation-date"
							dateTime={new Date(this.props.post.createdAt).toISOString()}
						>
							{new Date(this.props.post.createdAt).toLocaleDateString()}
						</time>
					</div>
				</div>
				{this.props.post.image ? (
					<img src={this.props.post.image} alt="" className="post__picture" />
				) : (
					""
				)}
				<p className="post__description">{this.props.post.content}</p>
				{this.props.user.roles && this.props.user.roles.includes("ADMIN") ? (
					<button href="#" onClick={this.handlePostDelete} className="post__delete">
						Supprimer
					</button>
				) : (
					""
				)}

				<div className="post__comments">
					<p className="post__comments-counter">
						<span>{comments.length}</span> commentaire(s)
					</p>

					<NewCommentForm
						postId={this.props.post.id}
						user={this.props.user}
						addComment={this.addComment.bind(this)}
					/>

					{comments
						? comments.map((comment) => {
								return (
									<Comment
										key={comment.id}
										comment={comment}
										user={this.props.user}
										deleteComment={this.deleteComment.bind(this)}
									/>
								);
						  })
						: ""}
				</div>
			</div>
		);
	}
}

export default Post;
