import React, { Component } from 'react';
import OrdersScreen from './Screen';
import { connect } from 'react-redux';
import { getOrders } from '../action';

class Container extends Component {
	componentDidMount = () =>
		this.props.user.id ? this.props.fetch(this.props.user.id) : this.props.navigation.navigate.goBack(null);

	shouldComponentUpdate = (nextProps, nextState) =>
		nextProps.data !== this.props.data ||
		nextProps.loading !== this.props.loading ||
		nextProps.error !== nextProps.error;

	render = () => <OrdersScreen {...this.props} />;
}

const mapStateToProps = ({ user, orders: { loading, error, data }, carriers, addresses }) => ({
	user,
	loading,
	error,
	data,
	carriers: carriers.data,
	addresses: addresses.data
});
const mapDispatchToProps = dispatch => ({
	fetch: id => dispatch(getOrders(id))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
