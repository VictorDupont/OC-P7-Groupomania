import React from "react";
import { Link } from "react-router-dom";

import "./Login.scss";
import Header from "../Components/Header";
import LoginForm from "./LoginForm";

function Login() {
	return (
		<div className="page-wrapper">
			<Header />
			<div className="main">
				<div className="login">
					<div className="login-form">
						<h1 className="login-form__title">Connexion</h1>
						<LoginForm />
					</div>

					<div className="login-register-modal">
						<p>
							Vous n'avez pas encore de compte ?{" "}
							<Link to="/register">S'inscrire</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
