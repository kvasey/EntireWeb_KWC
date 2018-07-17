import React, { Component } from 'react';
import ProductsScreen from './Screen';
import fetchAction, { clearData } from './action';
import { connect } from 'react-redux';

class Container extends Component {
	componentDidMount = () => {
		this.props.clearData();
		if (!this.props.navigation.state.params) this.props.navigation.navigate.goBack(null);
		this.props.fetch(this.props.navigation.state.params.categoryId);
	};
	shouldComponentUpdate = (nextProps, nextState) =>
		nextProps.data !== this.props.data || nextProps.activeSortIndex !== this.props.activeSortIndex;

	render = () => <ProductsScreen {...this.props} />;
}

const mapStateToProps = ({ products: { error, loading, data, activeSortIndex } }) => ({
	error,
	loading,
	data,
	activeSortIndex
});
const mapDispatchToProps = dispatch => ({
	fetch: productIds => dispatch(fetchAction(productIds)),
	clearData: () => dispatch(clearData())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
