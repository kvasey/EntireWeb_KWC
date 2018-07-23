import React, { Component, Fragment } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { createOrder } from '../orderActions';
import { EmptyComponent } from '../../styled/components';
import { OrderContentContainer } from '../../Profile/styled';
import { SummaryText } from '../styled';
import { renderHeader, renderAddresses, renderCarrier, renderProducts } from '../../Profile/Orders/Screen';
import PayFooter from '../PayFooter';
import payStripe from '../stripeActions';
class Container extends Component {
	componentDidMount = () => this.props.createOrder();

	render = () => {
		console.log(this.props);
		const {
			loading,
			error,
			deliveries,
			deliveryIndex,
			addresses,
			addressIndex,
			invoiceIndex,
			order,
			payStripe,
			stripe,
			basket,
			user,
			navigation
		} = this.props;
		const carrier = deliveries[deliveryIndex];
		const address = addresses[addressIndex];
		const invoice = addresses[invoiceIndex];

		return loading || error ? (
			<EmptyComponent loading={loading} error={error} />
		) : (
			<Fragment>
				<SummaryText>Order Summary</SummaryText>
				<ScrollView>
					{renderHeader(order, { height: 120 })}
					<OrderContentContainer>
						{renderAddresses(invoice, address)}
						{renderCarrier({ ...carrier, ...carrier.carrier }, carrier.price)}
						{renderProducts(order.associations.order_rows)}
					</OrderContentContainer>
					<PayFooter
						navigation={navigation}
						order={order}
						payStripe={payStripe}
						stripe={stripe}
						carrier={carrier}
						user={user}
						invoice={invoice}
						basket={basket}
					/>
				</ScrollView>
			</Fragment>
		);
	};
}

const mapStateToProps = ({
	checkout: {
		order: { order, cart, loading, error },
		stripe,
		deliveryIndex,
		deliveries,
		addressIndex,
		invoiceIndex
	},
	basket,
	addresses: {
		data: { addresses }
	},
	user
}) => ({
	basket,
	order: { ...cart, ...order },
	stripe,
	user,
	deliveryIndex,
	addressIndex,
	deliveries,
	invoiceIndex,
	addresses,
	loading,
	error
});
const mapDispatchToProps = dispatch => ({
	createOrder: () => dispatch(createOrder()),
	payStripe: query => dispatch(payStripe(query))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
