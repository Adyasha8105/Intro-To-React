import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
	state = {
		ingredients: {},
		totalPrice: 0
	};

	componentDidMount() {
		const search = this.props.location.search;
		const query = new URLSearchParams(search);
		const ing = {};
		let price;
		for (let param of query.entries()) {
			if (param[0] === "price") {
				price = param[1];
			} else {
				ing[param[0]] = +param[1];
			}
		}

		this.setState({ ingredients: ing, totalPrice: price });
	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace("/checkout/contact-data");
	};

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					price={this.state.totalPrice}
					onCheckoutCancelled={this.checkoutCancelledHandler}
					onCheckoutContinued={this.checkoutContinuedHandler}
				/>
				<Route
					path={`${this.props.match.path}/contact-data`}
					render={() => (
						<ContactData
							ingredients={this.state.ingredients}
							price={this.state.totalPrice}
						/>
					)}
				/>
			</div>
		);
	}
}

export default Checkout;
