import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "./../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your name"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your street"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			state: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your state"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your country"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			phone: {
				elementType: "input",
				elementConfig: {
					type: "number",
					placeholder: "Your phone"
				},
				value: "",
				validation: {
					required: true,
					min: 11,
					max: 11
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your email"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" }
					]
				},
				validation: {},
				value: "fastest",
				valid: true
			}
		},
		formIsValid: false,
		loading: false
	};

	checkValidity = (value, rules) => {
		let isValid = true;

		if (!rules) return isValid;

		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (rules.min) {
			isValid = value.length >= rules.min && isValid;
		}

		if (rules.max) {
			isValid = value.length <= rules.max && isValid;
		}

		return isValid;
	};

	orderHandler = event => {
		event.preventDefault();
		this.setState({ loading: true });
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value;
		}
		const orders = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData
		};
		axios
			.post("/orders.json", orders)
			.then(() => {
				this.setState({ loading: false });
				this.props.history.push("/");
			})
			.catch(e => this.setState({ loading: false }));
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;

		for (let inputId in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputId].valid && formIsValid;
		}

		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValid
		});
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map(formElement => {
					return (
						<Input
							key={formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							touched={formElement.config.touched}
							changed={event =>
								this.inputChangedHandler(event, formElement.id)
							}
						/>
					);
				})}
				<Button disabled={!this.state.formIsValid} btnType="Success">
					ORDER
				</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

export default withRouter(ContactData);
