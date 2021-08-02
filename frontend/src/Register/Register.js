import React from "react";
import { Link } from "react-router-dom";

import "./Register.scss";
import Header from "../Components/Header";
import RegisterForm from "./RegisterForm";

function Register() {
	return (
		<div className="page-wrapper">
			<Header />
			<div className="main">
				<div className="register">
					<div className="register-form">
						<h1 className="register-form__title">Inscription</h1>
						<RegisterForm />
					</div>

					<div className="register-login-modal">
						<p>
							Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
