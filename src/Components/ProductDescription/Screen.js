import React, { Fragment, Component } from 'react';
import { Text, View, ActivityIndicator, Platform, Image, ScrollView } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import Picker from 'react-native-picker';
import { Price, Name, ItemWrapper, Reference, Line } from './styled';
import { Button, StateComponent, height } from '../styled/general';
import { Color } from '../../constants';

export default class extends Component {
	state = {
		uri: '',
		pickerInitialized: false
	};

	initPicker = data => {
		let pickerData = [];
		Object.keys(data).forEach(key => {
			pickerData.push(data[key].map(({ name }) => name));
		});
		console.log(data);
		console.log(pickerData);

		Picker.init({
			pickerData,
			selectedValue: [0],
			pickerBg: [255, 255, 255, 1],
			pickerToolBarBg: [238, 238, 238, 1],
			pickerCancelBtnColor: [182, 30, 137, 1],
			pickerConfirmBtnColor: [182, 30, 137, 1],
			pickerConfirmBtnText: 'Confirm',
			pickerCancelBtnText: 'Cancel',
			pickerTitleText: '',
			pickerTextEllipsisLen: 20,
			pickerFontSize: 20,
			pickerFontFamily: Platform.OS === 'android' ? 'Roboto' : 'San Francisco',
			onPickerConfirm: data => console.log(data)
		});
		this.setState({ ...this.state, pickerInitialized: true });
	};

	static getDerivedStateFromProps = (nextProps, prevState) =>
		nextProps.product.uri ? { uri: nextProps.product.uri } : prevState;

	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.product.productOptions !== this.props.product.productOptions && !this.state.pickerInitialized) {
			this.initPicker(this.props.product.productOptions);
		}
	};

	render = () => {
		const { product } = this.props;
		const { uri } = this.state;
		return (
			product.id && (
				<ScrollView style={{ height: '100%', width: '100%', backgroundColor: '#FFF' }}>
					<Transition shared={`${product.id}`} appear="scale">
						<Image
							source={{ uri }}
							onLoad={() => this.setState({ uri: product.uri })}
							resizeMode="contain"
							style={{
								width: '100%',
								height: height * 0.3
							}}
						/>
					</Transition>
					<Line />
					<Name>{product.name}</Name>
					<Reference>#{product.reference}</Reference>
					<Price>£{product.price}</Price>
					<Line />
					<Button />
					<Button onPress={() => Picker.show()}>
						<Price>Open Picker</Price>
					</Button>
				</ScrollView>
			)
		);
	};
}
