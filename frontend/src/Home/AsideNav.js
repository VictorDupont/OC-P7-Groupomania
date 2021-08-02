import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import "./AsideNav.scss";

function AsideNav() {
	return (
		<div className="sidebar-nav">
			<a className="sidebar-nav__link" href="/messages">
				<FontAwesomeIcon
					icon={faEnvelope}
					className="sidebar-nav__icon"
					aria-label="messages"
				/>
				<span className="sidebar-nav__anchor">Posts</span>
			</a>
		</div>
	);
}

export default AsideNav;
