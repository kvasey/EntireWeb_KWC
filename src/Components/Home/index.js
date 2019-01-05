import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeScreen from './Screen';
import { getFirebase } from './action';

class Container extends Component {
	componentDidMount = () => {
		alert("Hi");
		this.props.fetch()};
	render = () => <HomeScreen {...this.props} />;
}

const mapStateToProps = ({ firebase: { data, loading, error } }) => ({
	ads: data,
	loading,
	error
});

const mapDispatchToProps = dispatch => ({
	fetch: () => dispatch(getFirebase())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
