import React, { Fragment, Component } from 'react';
import { Text, View, ActivityIndicator, Platform, Image, ScrollView } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import Picker from '../styled/Picker';
import { Price, Name, ItemWrapper, Reference, Line, PickerContainer } from './styled';
import Icon from 'react-native-vector-icons/Feather';
import {
	Button,
	StateComponent,
	height,
	Container,
	ButtonInner,
	ButtonInnerText,
	SubmitButton
} from '../styled/general';
import { Color } from '../../constants';
import HTMLView from 'react-native-htmlview';

export default class extends Component {
	state = {
		uri: '',
		productOptions: {}
	};

	static getDerivedStateFromProps = (nextProps, prevState) =>
		nextProps.product.uri
			? {
					uri: nextProps.product.uri
			  }
			: prevState;

	updateProductOptions = (activationIndex, key) =>
		this.setState({
			...this.state,
			productOptions: productOptionsActivator(this.getProductOptions(), activationIndex, key)
		});

	getProductOptions = () => {
		console.log(Object.keys(this.state.productOptions).length > 0);
		console.log(this.state.productOptions.length);
		return Object.keys(this.state.productOptions).length > 0
			? this.state.productOptions
			: this.props.product.productOptions;
	};

	renderPickers = () => {
		const productOptions = this.getProductOptions();
		const options = Object.keys(productOptions);
		return options.map((key, index) => (
			<Picker
				key={key}
				onSubmit={selectedIndex => this.updateProductOptions(selectedIndex, key)}
				options={productOptions[key]}
				activeIndex={productOptions[key].findIndex(({ active }) => active) || 0}
				pickerIndex={index}
				style={{
					width: `${(100 / options.length).toFixed(0)}%`,
					borderColor: '#EEE',
					borderStyle: 'solid',
					borderRightWidth: 1,
					borderLeftWidth: 1
				}}
			/>
		));
	};

	shouldComponentUpdate = (nextProps, nextState) =>
		this.state.productOptions !== nextState.productOptions || this.props.product.id !== nextProps.product.id;

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
					<Container flexDirection="row" style={{ marginHorizontal: '2.5%', paddingBottom: '2.5%' }}>
						<Container flex={0.5} alignItems="baseline">
							<Reference>#{product.reference}</Reference>
							<Price>£{product.price.toFixed(2)}</Price>
						</Container>
						<Container flex={0.5} alignItems="flex-end" style={{ marginHorizontal: '2.5%' }}>
							<Button useForeground>
								<Icon name="star" size={35} color={Color.main} />
							</Button>
						</Container>
					</Container>
					<PickerContainer>{this.renderPickers()}</PickerContainer>
					<SubmitButton
						onPress={() => console.log(product)}
						textChildren={() => (
							<Fragment>
								Add to Cart
								<Icon name="shopping-cart" size={18} style={{ marginLeft: 20 }} color="#FFF" />
							</Fragment>
						)}
						style={{
							marginHorizontal: 15,
							marginVertical: 15
						}}
					/>
					<View style={{ marginHorizontal: '5%', paddingBottom: '2.5%' }}>
						{renderHTML(product.description)}
					</View>
				</ScrollView>
			)
		);
	};
}

const productOptionsActivator = (productOptions, activationIndex, activationKey) => {
	let newProductOptions = {};
	Object.keys(productOptions).forEach(key => {
		newProductOptions[key] = productOptions[key].map(
			(item, index) =>
				key === activationKey
					? {
							...item,
							active: activationIndex === index
					  }
					: item
		);
	});
	return newProductOptions;
};

const renderHTML = html => {
	return <HTMLView value={html} />;
};
