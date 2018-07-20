import React, { Component } from 'react';
import ProductDescriptionScreen from './Screen';
import fetchAction from './action';
import { connect } from 'react-redux';
import { setIsProductList } from '../shared/action';
import { basketAdd } from '../BasketList/action';
import { favoritesAdd, favoritesRemove } from '../Favorites/action';
import Picker from '../styled/Picker';
class Container extends Component {
	componentDidMount = () => {
		this.props.setIsProductList(false);
		if (!this.props.navigation.state.params) this.props.navigation.goBack(null);
		this.props.fetch(this.props.navigation.state.params.productId);
	};

	render = () => <ProductDescriptionScreen {...this.props} />;
}

const mapStateToProps = ({ product, basket, favorites }) => ({ ...product, basket, favorites });
const mapDispatchToProps = dispatch => ({
	fetch: id => dispatch(fetchAction(id)),
	setIsProductList: state => dispatch(setIsProductList(state)),
	addToBasket: product => dispatch(basketAdd(product)),
	addToFavorites: product => dispatch(favoritesAdd(product)),
	removeFromFavorites: index => dispatch(favoritesRemove(index))
});

export const renderPickers = (productOptions, updateState) => {
	const options = Object.keys(productOptions);
	return options.map((key, index) => (
		<Picker
			key={key}
			onSubmit={selectedIndex => updateState(selectedIndex, key)}
			options={productOptions[key]}
			activeIndex={productOptions[key].findIndex(({ active }) => active) || 0}
			pickerIndex={index}
			style={{
				width: `${(100 / options.length).toFixed(0)}%`,
				borderColor: '#EEE',
				borderStyle: 'solid',
				borderRightWidth: 1,
				borderLeftWidth: 1
			}}
		/>
	));
};

export const productOptionsActivator = (productOptions, activationIndex, activationKey) => {
	let newProductOptions = {};
	Object.keys(productOptions).forEach(key => {
		newProductOptions[key] = productOptions[key].map(
			(item, index) =>
				key === activationKey
					? {
							...item,
							active: activationIndex === index
					  }
					: item
		);
	});
	return newProductOptions;
};

export const combinationActivator = (combinations, productOptions, activationIndex, activationKey) => {
	const productOptionIds = [];
	Object.keys(productOptions).forEach(key => {
		const activatedProductOption = productOptions[key].find(({ active }) => active);
		if (activatedProductOption) {
			productOptionIds.push(activatedProductOption.id);
		}
	});
	return combinations.find(({ productOptionValues }) => {
		const set = new Set([...productOptionIds, ...productOptionValues]);
		return set.size === productOptionIds.length;
	});
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
