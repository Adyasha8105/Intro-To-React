import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
	{ label: "Salad", type: "salad" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" }
];

const BuildControls = props => {
	return (
		<div className={classes.BuildControls}>
			<p>
				Current Price: <strong>{props.price.toFixed(2)}</strong>
			</p>
			{controls.map(control => (
				<BuildControl
					added={() => props.ingredientAdded(control.type)}
					removed={() => props.ingredientRemoved(control.type)}
					key={control.label}
					label={control.label}
				/>
			))}

			<button
				className={classes.OrderButton}
				disabled={!props.purchaseAble}
				onClick={props.purchase}
			>
				ORDER NOW
			</button>
		</div>
	);
};

export default BuildControls;
