import React, { Component } from 'react';
import ProductsScreen from './Screen';
import fetchAction, { clearData } from './action';
import { connect } from 'react-redux';

class Container extends Component {
	componentDidMount = () => {
		this.props.clearData();
		if (!this.props.navigation.state.params) this.props.navigation.goBack(null);
		this.props.fetch(this.props.navigation.state.params.categoryId);
	};
	shouldComponentUpdate = (nextProps, nextState) =>
		nextProps.data !== this.props.data || nextProps.activeSortIndex !== this.props.activeSortIndex;
	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.data !== this.props.data && this.props.data.length > 0) {
			const { params } = this.props.navigation.state;
			if (params) if (params.productId) this.props.navigation.navigate('ProductDescription', params);
		}
	};

	render = () => <ProductsScreen {...this.props} categoryId={this.props.navigation.state.params.categoryId} />;
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
