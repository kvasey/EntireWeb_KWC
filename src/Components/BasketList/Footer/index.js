import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setupCarriers, setProductCost } from '../../Checkout/action';
import { getPrice } from '../../util';
import Footer from './Footer';

class Container extends Component {
	componentDidUpdate = (prevProps, prevState) => {
		if (this.checkProps(prevProps)) this.setCosts(this.props);
	};

	// shouldComponentUpdate = (nextProps, nextState) => this.checkProps(nextProps);

	checkProps = props =>
		props.products !== this.props.products ||
		props.addresses !== this.props.addresses ||
		props.error !== this.props.error;
	componentDidMount = () => this.setCosts(this.props);

	setCosts = ({ setProductCost, setupCarriers, products }) => {
		setupCarriers(products);
		setProductCost(products);
	};

	render = () => <Footer {...this.props} />;
}

const mapStateToProps = ({ checkout, addresses: { data } }) => ({
	...checkout,
	addresses: data
});

const mapDispatchToProps = dispatch => ({
	setupCarriers: products => dispatch(setupCarriers(products)),
	setProductCost: products => dispatch(setProductCost(products))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
