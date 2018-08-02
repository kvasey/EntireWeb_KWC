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
		const { productCost, user, invoice, carrier, payStripe, navigation } = this.props;
		try {
			const shippingCost = (parseFloat(carrier.price) + parseFloat(carrier.price) * 0.2).toFixed(2);
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
			console.log(parseFloat(productCost), parseFloat(shippingCost));
			console.log(((parseFloat(productCost) + parseFloat(shippingCost)) * 100).toFixed(0));
			const token = await stripe.paymentRequestWithCardForm({
				smsAutofillDisabled: true,
				prefilledInformation
			});

			if (token) {
				payStripe({
					currency: CURRENCY,
					amount: ((parseFloat(productCost) + parseFloat(shippingCost)) * 100).toFixed(0),
					description: `${user.id}card`,
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
