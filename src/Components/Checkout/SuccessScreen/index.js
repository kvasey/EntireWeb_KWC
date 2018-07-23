import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SubmitButton, EmptyComponent } from '../../styled/components';
import { basketClear } from '../../BasketList/action';
import { updateOrder } from '../stripeActions';

class Success extends Component {
	componentDidMount = () => {
		this.props.clearBasket();
		this.props.updateOrder();
	};

	render() {
		console.log(this.props);
		const { loading, error, stripe, navigation } = this.props;
		return loading || error ? (
			<EmptyComponent loading={loading} error={error} />
		) : (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
								: 'An Error occcured.'
							: 'An Error occcured.'
						: 'An Error occcured.'}
				</Text>
				<SubmitButton
					style={{ paddingHorizontal: 10, paddingVertical: 10 }}
					textChildren="Return"
					onPress={() => {
						navigation.goBack(null);
						navigation.navigate('Home');
					}}
				/>
			</View>
		);
	}
}
const mapStateToProps = ({
	checkout: {
		stripe: { data, loading, error }
	}
}) => ({
	stripe: data,
	loading,
	error
});

const mapDispatchToProps = dispatch => ({
	clearBasket: () => dispatch(basketClear()),
	updateOrder: () => dispatch(updateOrder())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Success);
