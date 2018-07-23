import React, { PureComponent } from 'react';
import stripe from 'tipsi-stripe';
import Button from './Button';
import { TouchableOpacity, Text } from 'react-native';
import CarrierSelect from '../CarrierSelect';

const CURRENCY = 'GBP';

export default class extends PureComponent {
	state = {
		loading: false,
		token: null
	};

	handlePress = async () => {
		console.log(this.props);
		const { order, user, invoice, carrier, payStripe, navigation } = this.props;
		try {
			this.setState({ loading: true, token: null });
			const prefilledInformation = {
				billingAddress: {
					name: `${user.firstName} ${user.lastName}`,
					line1: invoice.address1,
					line2: invoice.address2,
					city: invoice.city,
					country: 'GB',
					postalCode: invoice.postcode,
					email: user.email
				}
			};
			console.log(prefilledInformation);
			const token = await stripe.paymentRequestWithCardForm({
				smsAutofillDisabled: true,
				prefilledInformation
			});
			console.log(token);
			if (token) {
				payStripe({
					currency: CURRENCY,
					amount: ((parseFloat(order.total_products) + parseFloat(shippingCost)) * 100).toFixed(0),
					description: `${user.id}aPAY`,
					token: token.tokenId
				});
				navigation.navigate('Success');
			}
			this.setState({ loading: false, token });
		} catch (error) {
			console.log(error);
			this.setState({ loading: false });
		}
	};

	render = () => (
		<Button disabled={this.state.loading} onPress={this.handlePress} text={'Pay by Card'} icon="credit-card" />
	);
}
