import React, { PureComponent } from 'react';
import stripe from 'tipsi-stripe';
import Button from './Button';
import { TouchableOpacity, Text } from 'react-native';

const CURRENCY = 'GBP';

export default class extends PureComponent {
	state = {
		loading: false,
		token: null,
		order: null
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		prevState.order !== nextProps.order ? { ...prevState, order: nextProps.order } : null;
	}

	handlePress = async () => {
		try {
			this.setState({ loading: true, token: null });
			const { user, billingAddress } = this.state.order;
			const prefilledInformation = {
				billingAddress: {
					name: `${user.firstName} ${user.lastName}`,
					line1: billingAddress.address1,
					line2: billingAddress.address2,
					city: billingAddress.city,
					country: 'GB',
					postalCode: billingAddress.postcode,
					email: user.email
				}
			};
			const token = await stripe.paymentRequestWithCardForm({
				smsAutofillDisabled: true,
				prefilledInformation
			});
			token
				? this.props.payStripe({
						currency: CURRENCY,
						amount: (
							(parseFloat(this.state.order.price) +
								parseFloat(this.state.order.shippingPrice) +
								parseFloat(this.state.order.shippingPrice) * 0.2) *
							100
						).toFixed(0),
						description: `${this.state.order.user.id}card`,
						token: token.tokenId
				  })
				: null;

			this.setState({ loading: false, token });
		} catch (error) {
			this.setState({ loading: false });
		}
	};

	render = () => (
		<Button
			disabled={this.state.loading || !this.state.order}
			onPress={this.handlePress}
			text={this.state.token ? this.state.token.tokenId : 'Pay by Card'}
			icon="credit-card"
		/>
	);
}
