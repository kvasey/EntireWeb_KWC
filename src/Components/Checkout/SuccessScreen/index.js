import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { SubmitButton, StateComponent } from "../../styled/components";
import { basketClear } from "../../BasketList/action";
import { createOrder } from "../orderActions";
import Analytics from "appcenter-analytics";
import { StackActions, NavigationActions } from "react-navigation";

class Success extends Component {
	state = {
		orderCreated: false
	};

	componentDidUpdate = () => {
		const { loading, error, stripe, user } = this.props;
		if (
			!loading &&
			!error &&
			stripe &&
			stripe.isOk &&
			!this.state.orderCreated
		) {
			this.setState({
				orderCreated: true
			});
			Analytics.trackEvent("Stripe", {
				status: "OK",
				userId: user.id,
				paid: stripe.charge.amount,
				description: stripe.charge.description
			});
			this.props.createOrder();
			this.props.clearBasket();
		}
		if (error || !stripe.isOk) {
			Analytics.trackEvent("Stripe", { status: "FAIL", userId: user.id });
			// if (!this.state.orderCreated) {
			// 	this.setState({
			// 		//orderCreated: true
			// 	});
				
			// }
		}
	};

	render() {
		const { loading, error, stripe, navigation } = this.props;
		return loading || error ? (
			<StateComponent loading={loading} error={error} />
		) : (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text
					style={{
						paddingHorizontal: 10,
						paddingVertical: 10,
						fontSize: 20
					}}
				>
					{stripe
						? stripe.charge
							? stripe.charge.outcome
								? stripe.charge.outcome.seller_message
								: "An Error occurred."
							: "An Error occurred."
						: "An Error occurred."}
				</Text>
				<SubmitButton
					style={{ paddingHorizontal: 10, paddingVertical: 10 }}
					textChildren="Return"
					onPress={() => {
						this.props.navigation.dispatch(
							StackActions.reset({
								index: 0,
								actions: [
									NavigationActions.navigate({ routeName: "BasketList" })
								]
							})
						);
						navigation.navigate("Home");
					}}
				/>
			</View>
		);
	}
}
const mapStateToProps = ({
	checkout: {
		stripe: { data, loading, error }
	},
	user
}) => ({
	stripe: data,
	loading,
	error,
	user
});

const mapDispatchToProps = dispatch => ({
	clearBasket: () => dispatch(basketClear()),
	createOrder: () => dispatch(createOrder())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Success);
