import React, { Component } from 'react';
import LoginScreen from './Screen';
import { connect } from 'react-redux';
import { loginUser } from '../action';

class Container extends Component {
	componentDidMount = () => {
		if (this.props.user) this.props.navigation.navigate('Profile');
	};

	static getDerivedStateFromProps({ login, user, navigation }) {
		if (login.loading) navigation.navigate('Profile');
		return null;
	}

	render = () => <LoginScreen {...this.props} />;
}
const mapStateToProps = ({ user, login }) => ({
	user,
	login
});
const mapDispatchToProps = dispatch => ({ loginUser: data => dispatch(loginUser(data)) });

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
