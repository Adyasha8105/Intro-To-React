import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "./../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "./../../withErrorHandler/withErrorHander";

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchaseAble: false,
		purchasing: false,
		loading: false,
		error: false
	};

	componentDidMount() {
		axios
			.get(
				" "
			)
			.then(res => {
				this.setState({ ingredients: res.data });
			})
			.catch(error => this.setState({ error }));
	}

	updatePurchaseState = ingredients => {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => sum + el, 0);

		this.setState({ purchaseAble: sum > 0 });
	};

	purchaseHandle = () => {
		this.setState({ purchasing: true });
	};

	addIncredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = priceAddition + oldPrice;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	};

	removeIncredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	continuePurchaseHandler = () => {
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(
				encodeURIComponent(i) +
					"=" +
					encodeURIComponent(this.state.ingredients[i])
			);
		}
		queryParams.push("price=" + this.state.totalPrice);
		const queryString = queryParams.join("&");
		this.props.history.push({
			pathname: "/checkout",
			search: `?${queryString}`
		});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;

		let burger = this.state.error ? (
			<p>Ingredients can't be loaded</p>
		) : (
			<Spinner />
		);

		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						price={this.state.totalPrice}
						ingredientAdded={this.addIncredientHandler}
						ingredientRemoved={this.removeIncredientHandler}
						disabled={this.disabledInfo}
						purchaseAble={this.state.purchaseAble}
						purchase={this.purchaseHandle}
					/>
				</Aux>
			);

			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					cancelOrder={this.purchaseCancelHandler}
					price={this.state.totalPrice}
					continueOrder={this.continuePurchaseHandler}
				/>
			);
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<Aux>
				<Modal
					modalClosed={this.purchaseCancelHandler}
					show={this.state.purchasing}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
