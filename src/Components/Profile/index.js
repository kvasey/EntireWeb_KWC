import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Button } from 'react-native-paper';
import { clearData } from '../Auth/action';
import { clearAddresses } from './action';
import { StateComponent } from '../styled/components';
import { height } from '../styled/general';
import ProfileTabs from '../../Navigators/ProfileTabs';
import {
	RenderContainer,
	BackgroundImage,
	BackgroundOverlay,
	headerHeightProportion,
	ButtonText,
	InitialsView,
	InitialsText
} from './styled';

class Profile extends Component {
	state = {
		height: 1000
	};

	setHeight = newHeight => this.setState({ height: newHeight });

	render = () => {
		const { loading, error, user, logout, clearAddresses, navigation } = this.props;
		return loading || error || !user ? (
			<StateComponent
				loading={loading || (!user && !error)}
				error={error}
				onPress={() => navigation.goBack(null)}
			/>
		) : (
			<ParallaxScrollView
				style={{ flex: 1, overflow: 'hidden' }}
				backgroundSpeed={1}
				outputScaleValue={3}
				renderBackground={() => (
					<RenderContainer>
						<BackgroundImage source={require('../../../assets/profile.jpg')} />
						<BackgroundOverlay />
					</RenderContainer>
				)}
				renderForeground={() => (
					<RenderContainer>
						<Button
							style={{
								position: 'absolute',
								right: 5,
								top: 5,
								width: '15%',
								borderWidth: 1,
								borderColor: '#EEE',
								borderRadius: 5
							}}
							onPress={() => {
								navigation.goBack(null);
								clearAddresses();
								logout();
							}}
						>
							<ButtonText>Log Out</ButtonText>
						</Button>
						<InitialsView>
							<InitialsText>
								{user.firstName.toUpperCase()[0] + user.lastName.toUpperCase()[0]}
							</InitialsText>
						</InitialsView>
						<ButtonText style={{ marginTop: 10, color: '#FFF', fontSize: 16 }}>
							{`${user.firstName} ${user.lastName}`}
						</ButtonText>
					</RenderContainer>
				)}
				parallaxHeaderHeight={height / headerHeightProportion}
			>
				<View style={{ height: Platform.OS === 'ios' ? '100%' : this.state.height }}>
					<ProfileTabs
						screenProps={{
							rootNavigation: navigation,
							setHeight: this.setHeight,
							currentHeight: this.state.height
						}}
					/>
				</View>
			</ParallaxScrollView>
		);
	};
}

const mapStateToProps = ({ user, login, registration }) => ({
	user,
	loading: login.loading || registration.loading,
	error: login.error || registration.error
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(clearData()),
	clearAddresses: () => dispatch(clearAddresses())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);
