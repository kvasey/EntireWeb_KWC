import React, { Component } from 'react';
import { AppState, Alert } from 'react-native';
import { connect } from 'react-redux';
import fetchAction from './action';
import fetchCategories from '../Categories/action';
import Push from 'appcenter-push';

const mapDispatchToProps = dispatch => ({
	fetch: () => dispatch(fetchAction()),
	categories: () => dispatch(fetchCategories())
});

export default connect(
	null,
	mapDispatchToProps
)(
	class extends Component {
		componentDidMount = () => {
			this.props.categories();
			this.props.fetch();
		};

		render = () => null;
	}
);

Push.setListener({
	onPushNotificationReceived: pushNotification => {
		let message = pushNotification.message;
		let title = pushNotification.title;

		if (message === null || message === undefined) {
			// Android messages received in the background don't include a message. On Android, that fact can be used to
			// check if the message was received in the background or foreground. For iOS the message is always present.
			title = 'Android background';
			message = '<empty>';
		}

		// Custom name/value pairs set in the App Center web portal are in customProperties
		if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
			message += '\nCustom properties:\n' + JSON.stringify(pushNotification.customProperties);
		}

		if (AppState.currentState === 'active') {
			Alert.alert(title, message);
		} else {
			// Sometimes the push callback is received shortly before the app is fully active in the foreground.
			// In this case you'll want to save off the notification info and wait until the app is fully shown
			// in the foreground before displaying any UI. You could use AppState.addEventListener to be notified
			// when the app is fully in the foreground.
		}
	}
});
