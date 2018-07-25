import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCarrier, setDeliveries, setupCarriers } from '../action';
import { StateComponent } from '../../styled/components';
import CarrierScreen from './Screen';

class Container extends Component {
	componentDidMount = () => {
		this.props.clearDeliveries();
		this.props.getDeliveries();
	};
	render = () =>
		this.props.loading || this.props.error ? (
			<StateComponent loading={this.props.loading} error={this.props.error} />
		) : (
			<CarrierScreen {...this.props} />
		);
}

const mapStateToProps = ({ checkout: { deliveries, error, loading } }) => ({ deliveries, error, loading });
const mapDispatchToProps = dispatch => ({
	setCarrier: index => dispatch(setCarrier(index)),
	clearDeliveries: () => dispatch(setDeliveries([])),
	getDeliveries: () => dispatch(setupCarriers())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
