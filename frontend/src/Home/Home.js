import React, { Component } from "react";
import axios from "axios";

import "./Home.scss";
import Header from "../Components/Header";
import Profile from "./Profile";
import Posts from "./Posts";

class Home extends Component {
	state = {
		user: {},
	};

	componentDidMount() {
		this.authenticate();
	}

	authenticate() {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; token=`);
		const token = parts.pop().split(";").shift();

		axios
			.get("http://localhost:3000/api/auth/me", {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
			.then((res) => {
				this.setState({ user: res.data });
			})
			.catch(() => {
				window.location.href = "/logout";
			});
	}

	render() {
		const { user } = this.state;

		return (
			<div className="page-wrapper">
				<Header />
				<div className="home-main">
					<Profile user={user} />
					<Posts user={user} />
				</div>
			</div>
		);
	}
}

export default Home;
