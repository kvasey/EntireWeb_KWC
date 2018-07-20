import React, { Component } from 'react';
import { connect } from 'react-redux';
import Basket from './Screen';
import { basketSetItem, basketRemove } from './action';

class Container extends Component {
	render = () => <Basket {...this.props} />;
}

const mapStateToProps = ({ basket }) => ({
	basket
});
const mapDispatchToProps = dispatch => ({
	setBasketItem: (item, index) => dispatch(basketSetItem(item, index)),
	removeBasketItem: index => dispatch(basketRemove(index))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
