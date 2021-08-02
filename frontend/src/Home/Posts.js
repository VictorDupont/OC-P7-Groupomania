import React, { Component } from "react";
import axios from "axios";

import "./Posts.scss";
import Post from "./Post";
import NewPostForm from "./NewPostForm";

class Posts extends Component {
	state = {
		posts: [],
	};

	componentDidMount() {
		this.getPosts();
	}

	getPosts() {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; token=`);
		const token = parts.pop().split(";").shift();

		axios
			.get("http://localhost:3000/api/posts?sort=createdAt&order=desc&include=user", {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
			.then((res) => {
				this.setState({ posts: res.data });
			})
			.catch((err) => {
				console.log(err);
				window.alert("Erreur survenue, veuillez réessayer ou reconnectez-vous");
			});
	}

	deletePost(postId) {
		let { posts } = this.state;
		posts = posts.filter((post) => post.id !== postId);
		this.setState({ posts });
	}

	addPost(post) {
		let { posts } = this.state;
		posts = [post, ...posts];
		this.setState({ posts });
	}

	render() {
		let { posts } = this.state;

		return (
			<div className="posts">
				<NewPostForm addPost={this.addPost.bind(this)} user={this.props.user} />

				{posts
					? posts.map((post) => {
							return (
								<Post
									key={post.id}
									post={post}
									user={this.props.user}
									deletePost={this.deletePost.bind(this)}
								/>
							);
					  })
					: ""}
			</div>
		);
	}
}

export default Posts;
