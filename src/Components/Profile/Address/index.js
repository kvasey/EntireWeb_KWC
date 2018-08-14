import React, { Component } from 'react';
import AddressScreen from './Screen';
import { connect } from 'react-redux';
import { StateComponent } from '../../styled/components';
import { createUpdateAddress } from '../action';

class Container extends Component {
	render = () => {
		const { countries, states, createAddress, navigation } = this.props;

		const loading = countries.loading || states.loading || createAddress.loading;
		const error = countries.error || states.error || createAddress.error;

		return loading || error ? (
			<StateComponent loading={loading} error={error} />
		) : (
			<AddressScreen
				navigation={navigation}
				countries={countries.data.countries}
				states={states.data.states}
				createAddress={this.props.create}
			/>
		);
	};
}

const mapStateToProps = ({ countries, states, createAddress }) => ({
	createAddress,
	countries,
	states
});
const mapDispatchToProps = dispatch => ({
	create: address => dispatch(createUpdateAddress(address))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
