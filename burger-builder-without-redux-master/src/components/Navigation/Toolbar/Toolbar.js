import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "./../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggler from "../SideDrawer/DrawerToggler/DrawerToggler";

const Toolbar = props => (
	<header className={classes.Toolbar}>
		<DrawerToggler clicked={props.openSideDrawer} />
		<div className={classes.Logo}>
			<Logo />
		</div>
		<nav className={classes.DesktopOnly}>
			<NavigationItems />
		</nav>
	</header>
);

export default Toolbar;
