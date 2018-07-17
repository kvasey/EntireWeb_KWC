import React, { Component } from 'react';
import RegisterScreen from './Screen';
import { connect } from 'react-redux';
import { registerUser } from '../action';

class Container extends Component {
	componentDidMount = () => {
		if (this.props.user) this.props.navigation.navigate('Profile');
	};

	static getDerivedStateFromProps({ registration, navigation }) {
		if (registration.loading) navigation.navigate('Profile');
		return null;
	}

	render = () => <RegisterScreen {...this.props} />;
}
const mapStateToProps = ({ user, registration }) => ({
	user,
	registration
});
const mapDispatchToProps = dispatch => ({ registerUser: data => dispatch(registerUser(data)) });

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
