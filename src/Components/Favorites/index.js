import React, { Component } from 'react';
import FavoritesScreen from './Screen';
import { connect } from 'react-redux';

class Container extends Component {
	render = () => <FavoritesScreen {...this.props} />;
}

const mapStateToProps = ({ favorites }) => ({ favorites });
export default connect(
	mapStateToProps,
	null
)(Container);
