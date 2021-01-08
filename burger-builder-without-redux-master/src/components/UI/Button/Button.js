import React from "react";
import classes from "./Button.module.css";

const Button = props => {
	return (
		<button
			disabled={props.disabled}
			onClick={props.clicked}
			className={[classes.Button, classes[props.btnType]].join(" ")}
		>
			{props.children}
		</button>
	);
};

export default Button;
