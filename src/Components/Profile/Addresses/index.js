import React, { Component } from 'react';
import AddressesScreen from './Screen';
import { connect } from 'react-redux';
import { getAddresses } from '../action';

class Container extends Component {
	componentDidMount = () =>
		this.props.user.id ? this.props.fetch(this.props.user.id) : this.props.navigation.goBack(null);

	shouldComponentUpdate = (nextProps, nextState) =>
		nextProps.data !== this.props.data ||
		nextProps.loading !== this.props.loading ||
		nextProps.error !== nextProps.error;

	render = () => <AddressesScreen {...this.props} />;
}

const mapStateToProps = ({ user, addresses: { loading, error, data } }) => ({
	user,
	loading,
	error,
	data
});
const mapDispatchToProps = dispatch => ({
	fetch: id => dispatch(getAddresses(id))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
