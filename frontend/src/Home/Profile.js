import React, { Component } from "react";
import axios from "axios";

import "./Profile.scss";
import profilePic from "./OpenClassrooms.png";

class Profile extends Component {
	handleDelete() {
		if (window.confirm("Voulez vous vraiment supprimer votre compte ?")) {
			const value = `; ${document.cookie}`;
			const parts = value.split(`; token=`);
			const token = parts.pop().split(";").shift();

			axios
				.delete("http://localhost:3000/api/users", {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				.then(() => {
					window.location.href = "/logout";
				})
				.catch((err) => {
					console.log(err);
					window.alert("Erreur survenue, veuillez réessayer ou reconnectez-vous");
				});
		}
	}

	render() {
		return (
			<div className="profile__wrapper">
				<div className="profile">
					<div className="profile__header">
						<img src={profilePic} alt="" className="profile__picture" />
						<div>
							<p className="profile__fullname">{this.props.user.username}</p>
						</div>
					</div>
					<button href="#" className="profile__delete" onClick={this.handleDelete}>
						Supprimer mon compte
					</button>
				</div>
			</div>
		);
	}
}

export default Profile;
