import React, { PureComponent } from 'react';
import stripe from 'tipsi-stripe';
import Button from './Button';
const CURRENCY = 'GBP';

export default class extends PureComponent {
	state = {
		loading: false,
		allowed: false,
		complete: true,
		setup: false,
		status: null,
		token: null
	};

	async componentDidMount() {
		try {
			const allowed = await stripe.deviceSupportsAndroidPay();
			const setup = await stripe.canMakeAndroidPayPayments();

			this.setState({
				allowed,
				setup
			});
		} catch (error) {
			console.log(error);
		}
	}

	handleCompleteChange = complete => this.setState({ complete });

	handlePress = async () => {
		const { productCost, user, carrier, payStripe, basket, navigation } = this.props;
		try {
			this.setState({
				loading: true,
				status: null,
				token: null
			});
			const shippingCost = (parseFloat(carrier.price) + parseFloat(carrier.price) * 0.2).toFixed(2);

			const totalPrice = parseFloat(productCost) + parseFloat(shippingCost);

			const items = basket.map(({ name, reference, combination, quantity }) => ({
				currency_code: CURRENCY,
				description: `${name} #${reference}`,
				total_price: `${combination.price * quantity}`,
				unit_price: combination.price,
				quantity: quantity
			}));

			const options = {
				total_price: totalPrice,
				currency_code: CURRENCY,
				shipping_address_required: false,
				billing_address_required: false,
				line_items: items
			};

			const token = await stripe.paymentRequestWithAndroidPay(items, options);

			this.setState({ loading: false, token });

			if (token) {
				payStripe({
					currency: CURRENCY,
					amount: ((parseFloat(productCost) + parseFloat(shippingCost)) * 100).toFixed(0),
					description: `${user.id}gPAY`,
					token: token.tokenId
				});
				navigation.navigate('Success');
			}
			this.setState({ status: 'Google Pay payment completed' });
			if (!token) {
				this.setState({ status: 'Google Pay payment canceled' });
			}
		} catch (error) {
			this.setState({ loading: false, status: `Error: ${error.message}` });
		}
	};

	render = () =>
		this.state.allowed ? (
			<Button
				icon="google"
				disabled={this.state.loading}
				onPress={this.handlePress}
				text={this.state.loading ? 'Loading...' : this.state.setup ? 'Pay' : 'Google Pay Not Setup'}
			/>
		) : null;
}
