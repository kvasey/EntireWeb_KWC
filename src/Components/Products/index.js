import React, { Component } from 'react';
import ProductsScreen from './Screen';
import fetchAction, { clearData, searchAction } from './action';
import { connect } from 'react-redux';

class Container extends Component {
	componentDidMount = () => {
		this.props.clearData();
		if (!this.props.navigation.state.params) this.props.navigation.goBack(null);
		if (this.props.navigation.state.params.query) this.props.search(this.props.navigation.state.params.query);
		else this.props.fetch(this.props.navigation.state.params.categoryId);
	};

	shouldComponentUpdate = (nextProps, nextState) =>
		nextProps.data !== this.props.data || nextProps.activeSortIndex !== this.props.activeSortIndex;

	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.data !== this.props.data && this.props.data.length > 0) {
			const { params } = this.props.navigation.state;
			if (params)
				if (params.productId)
					if (this.props.data.find(item => item.id === params.productId))
						this.props.navigation.navigate('ProductDescription', params);
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
	search: query => dispatch(searchAction(query)),
	clearData: () => dispatch(clearData())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
