import React, { Component } from "react";
import Aux from "../Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "./../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "./../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
	state = {
		showSideDrawer: false
	};

	sideDrawerCloseHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	showSideDrawerHandler = () => {
		this.setState({ showSideDrawer: true });
	};

	render() {
		return (
			<Aux>
				<Toolbar openSideDrawer={this.showSideDrawerHandler} />
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerCloseHandler}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

export default Layout;
