import React, { Component } from "react";
import Aux from "./../hoc/Auxiliary";
import Modal from "./../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null
		};
		componentWillMount() {
			this.requestInstance = axios.interceptors.request.use(req => {
				this.setState({ error: null });
				return req;
			});

			this.responseInstance = axios.interceptors.response.use(
				res => res,
				error => {
					this.setState({ error });
				}
			);
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.requestInstance);
			axios.interceptors.response.eject(this.responseInstance);
		}

		errorConfirmHandler = () => {
			this.setState({ error: null });
		};

		render() {
			return (
				<Aux>
					<Modal
						show={this.state.error}
						modalClosed={this.errorConfirmHandler}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />;
				</Aux>
			);
		}
	};
};

export default withErrorHandler;
