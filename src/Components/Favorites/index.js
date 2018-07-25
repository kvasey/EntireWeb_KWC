import React, { Component } from 'react';
import CheckoutScreen from './Screen';
import { connect } from 'react-redux';
import { favoritesRemove } from './action';

class Container extends Component {
	render = () => <CheckoutScreen {...this.props} />;
}

const mapStateToProps = ({ favorites }) => ({ favorites });
const mapDispatchToProps = dispatch => ({ removeItem: index => dispatch(favoritesRemove(index)) });

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
