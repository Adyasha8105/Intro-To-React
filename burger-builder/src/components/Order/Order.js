import React from "react";
import classes from "./Order.module.css";

const order = props => {
	const ingredients = [];
	for (let ingName in props.ingredients) {
		ingredients.push({ name: ingName, amount: props.ingredients[ingName] });
	}

	const ingredientOutput = ingredients.map(ig => {
		return (
			<span key={ig.name} className={classes.Span}>
				{ig.name} ({ig.amount})
			</span>
		);
	});
	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientOutput}</p>
			<p>
				Price: <strong>USD {props.price.toFixed(2)}</strong>
			</p>
		</div>
	);
};

export default order;
