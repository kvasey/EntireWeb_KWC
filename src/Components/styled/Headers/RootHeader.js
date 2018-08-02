import React, { Component } from 'react';
import { TouchableNativeFeedback, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import IconBadge from 'react-native-icon-badge';
import headerLogo from '../../../../assets/headerLogo.png';
import { Color } from '../../../constants';
import { TextInput, HelperText } from 'react-native-paper';
import { RootHeaderWrapper, LeftHeaderButton, MiddleHeaderButton, RightHeaderButton, LogoImage } from './index';
import { Button } from '../general';

export default class extends Component {
	state = {
		isSearchOn: false,
		searchValue: ''
	};

	render = () =>
		this.state.isSearchOn ? (
			<RootHeaderWrapper>
				<Button
					onPress={() => this.setState({ isSearchOn: false })}
					background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
					style={{ flex: 0.2 }}
				>
					<LeftHeaderButton>
						<Icon name="arrow-left" size={Platform.isPad ? 35 : 25} color={Color.main} />
					</LeftHeaderButton>
				</Button>

				<MiddleHeaderButton style={{ flex: 0.4 }}>
					<TextInput
						name="search"
						label=""
						style={{ marginBottom: 10, padding: 0, width: '150%' }}
						placeholder="Input Query..."
						onChangeText={value => this.setState({ searchValue: value })}
						value={this.state.searchValue}
						onSubmitEditing={() => {
							if (this.state.searchValue.length > 1) {
								this.props.navigation.push('Products', { query: this.state.searchValue });
								this.setState({ isSearchOn: false });
							}
						}}
						onBlur={() => this.setState({ isSearchOn: false })}
						autoFocus={true}
						underlineColor={Color.secondary}
					/>
				</MiddleHeaderButton>

				<Button
					onPress={() => {
						if (this.state.searchValue.length > 1) {
							this.props.navigation.navigate('Products', { query: this.state.searchValue });
							this.setState({ isSearchOn: false });
						}
					}}
					background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
					style={{ flex: 0.2 }}
				>
					<RightHeaderButton>
						<BasketIcon>
							<Icon name="search" size={Platform.isPad ? 35 : 25} color={Color.main} />
						</BasketIcon>
					</RightHeaderButton>
				</Button>
			</RootHeaderWrapper>
		) : (
			<RootHeaderWrapper>
				<Button
					onPress={() => this.setState({ isSearchOn: true })}
					background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
					style={{ flex: 0.2 }}
				>
					<LeftHeaderButton>
						<Icon name="search" size={Platform.isPad ? 35 : 25} color={Color.main} />
					</LeftHeaderButton>
				</Button>

				<Button
					onPress={() => this.props.navigation.navigate('Home')}
					useForeground
					background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
					style={{ flex: 0.4 }}
				>
					<MiddleHeaderButton>
						<LogoImage source={headerLogo} resizeMode="contain" />
					</MiddleHeaderButton>
				</Button>
				<Button
					onPress={() => this.props.navigation.navigate('Basket')}
					background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
					style={{ flex: 0.2 }}
				>
					<RightHeaderButton>
						<BasketIcon>
							<Icon name="shopping-bag" size={Platform.isPad ? 35 : 25} color={Color.main} />
						</BasketIcon>
					</RightHeaderButton>
				</Button>
			</RootHeaderWrapper>
		);
}

const BasketIcon = connect(
	({ basket }) => ({
		length: basket.length
	}),
	null
)(({ length, children }) => (
	<IconBadge
		MainElement={children}
		BadgeElement={<Text style={{ color: '#FFF', fontSize: 12 }}>{length}</Text>}
		IconBadgeStyle={{
			top: -10,
			right: -12,
			minWidth: 18,
			height: 18,
			borderRadius: 20,
			backgroundColor: Color.secondary
		}}
		Hidden={length < 1}
	/>
));
