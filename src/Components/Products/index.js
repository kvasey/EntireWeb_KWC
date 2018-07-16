import React, { Component } from 'react';
import ProductsScreen from './Screen';
import fetchAction, { clearData } from './action';
import { connect } from 'react-redux';
import { setIsProductList } from '../shared/action';

class Container extends Component {
	componentDidMount = () => {
		this.props.clearData();
		if (!this.props.navigation.state.params) this.props.navigation.navigate.goBack(null);
		this.props.fetch(this.props.navigation.state.params.categoryId);
	};

	render = () => {
		return <ProductsScreen {...this.props} />;
	};
}

const mapStateToProps = ({ products: { error, loading, data, sortType } }) => ({
	error,
	loading,
	data,
	sortType
});
const mapDispatchToProps = dispatch => ({
	fetch: productIds => dispatch(fetchAction(productIds)),
	clearData: () => dispatch(clearData()),
	setIsProductList: state => dispatch(setIsProductList(state))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
