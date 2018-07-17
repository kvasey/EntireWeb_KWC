import React, { Component } from 'react';
import ProductDescriptionScreen from './Screen';
import fetchAction from './action';
import { connect } from 'react-redux';
import { setIsProductList } from '../shared/action';

class Container extends Component {
	componentDidMount = () => {
		this.props.setIsProductList(false);
		if (!this.props.navigation.state.params) this.props.navigation.navigate.goBack(null);
		this.props.fetch(this.props.navigation.state.params.productId);
	};

	render = () => <ProductDescriptionScreen {...this.props} />;
}

const mapStateToProps = ({ product }) => ({ product });
const mapDispatchToProps = dispatch => ({
	fetch: id => dispatch(fetchAction(id)),
	setIsProductList: state => dispatch(setIsProductList(state))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
