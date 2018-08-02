import React, { Fragment, Component } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import { Price, Name, ItemWrapper, Reference, Line, PickerContainer } from './styled';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, height, Container, width } from '../styled/general';
import { SubmitButton } from '../styled/components';
import { Color } from '../../constants';
import HTMLView from 'react-native-htmlview';
import { Snackbar } from 'react-native-paper';
import Lightbox from 'react-native-lightbox';
import ImageZoom from 'react-native-image-pan-zoom';
import { combinationActivator, productOptionsActivator, renderPickers } from '../ProductDescription';

export default class extends Component {
	state = {
		uri: null,
		productOptions: {},
		combination: null,
		isSnackVisible: false,
		snackBarText: '',
		lightboxOpen: false
	};

	static getDerivedStateFromProps = (nextProps, prevState) =>
		nextProps.uri
			? {
					...prevState,
					uri: nextProps.uri
			  }
			: prevState;

	updateState = (activationIndex, key) =>
		this.setState(
			{
				...this.state,
				productOptions: productOptionsActivator(this.getProductOptions(), activationIndex, key)
			},
			() =>
				this.setState({
					...this.state,
					combination: combinationActivator(this.props.combinations, this.state.productOptions)
				})
		);

	isProductInCart = () =>
		!!this.props.basket.find(
			({ id, combination }) => this.props.id === id && combination === this.props.defaultCombination
		);

	isProductFavorite = () => !!this.props.favorites.find(({ id }) => this.props.id === id);

	submitFavorite = isFavorite => {
		if (isFavorite) {
			const index = this.props.favorites.find(({ id }) => this.props.id === id);
			this.props.removeFromFavorites(index);
		} else
			this.props.addToFavorites({
				id: this.props.id,
				name: this.props.name,
				uri: this.props.mediumUri,
				categoryId: this.props.navigation.state.params.categoryId
			});
	};

	onSubmit = () => {
		if (!this.isProductInCart())
			this.props.addToBasket({
				id: this.props.id,
				name: this.props.name,
				reference: this.props.reference,
				quantity: 1,
				uri: this.props.cartUri,
				combination: this.getCombination(),
				combinations: this.props.combinations,
				productOptions: this.getProductOptions()
			});
	};

	getProductOptions = () => (this.isProductOptionsSet() ? this.state.productOptions : this.props.productOptions);

	getCombination = () => this.state.combination || this.props.defaultCombination;

	showSnackBar = snackBarText =>
		this.setState({ ...this.state, isSnackVisible: true, snackBarText }, () =>
			setTimeout(() => this.setState({ ...this.state, isSnackVisible: false }), 2500)
		);

	isProductOptionsSet = () => Object.keys(this.state.productOptions).length > 0;

	shouldComponentUpdate = (nextProps, nextState) =>
		this.state.combination !== nextState.combination ||
		this.state.isSnackVisible !== nextState.isSnackVisible ||
		this.state.lightboxOpen !== nextState.lightboxOpen ||
		this.props.id !== nextProps.id;

	render = () => {
		const oldUri = this.props.navigation.state.params.imageUri;
		const combination = this.getCombination();
		return (
			<ScrollView style={{ height: '100%', width: '100%', backgroundColor: '#FFF' }}>
				<Transition shared={`${oldUri}`} appear="scale">
					<Lightbox
						onClose={() => this.setState({ lightboxOpen: false })}
						onOpen={() => this.setState({ lightboxOpen: true })}
						didOpen={() => console.log('did')}
						springConfig={{ tension: 15, friction: 7 }}
						backgroundColor="rgba(255,255,255,0.95)"
						underlayColor="#FFF"
						swipeToDismiss={false}
					>
						{this.state.lightboxOpen ? (
							<ImageZoom
								cropWidth={width}
								cropHeight={height}
								imageWidth={width * 0.8}
								imageHeight={height * 0.8}
							>
								<Image
									onLoad={() => this.setState({ uri: this.props.uri })}
									style={{
										width: '100%',
										height: height
									}}
									resizeMode="contain"
									source={{ uri: this.state.uri || oldUri }}
								/>
							</ImageZoom>
						) : (
							<Image
								onLoad={() => this.setState({ uri: this.props.uri })}
								style={{
									width: '100%',
									height: height * 0.3
								}}
								resizeMode="contain"
								source={{ uri: this.state.uri || oldUri }}
							/>
						)}
					</Lightbox>
				</Transition>
				<Line />
				{this.props.id
					? renderContent(
							this.props,
							combination,
							() =>
								renderFavoriteButton(this.submitFavorite, this.showSnackBar, this.isProductFavorite()),
							() => renderPickers(this.getProductOptions(), this.updateState),
							() =>
								renderSubmitButton(combination, this.onSubmit, this.showSnackBar, this.isProductInCart)
					  )
					: null}

				<Snackbar visible={this.state.isSnackVisible} onDismiss={() => {}}>
					{this.state.snackBarText}
				</Snackbar>
			</ScrollView>
		);
	};
}

const renderContent = ({ name, reference, description }, combination, favoriteButton, pickers, submitButton) => (
	<Fragment>
		<Name>{name}</Name>
		<Reference>#{reference}</Reference>
		<Container flexDirection="row" style={{ marginHorizontal: '2.5%', paddingBottom: '2%' }}>
			<Container flex={0.5} alignItems="baseline">
				<Price>£{getPrice(combination.price)}</Price>
			</Container>
			<Container flex={0.5} alignItems="flex-end" style={{ marginHorizontal: '2.5%', paddingBottom: '2%' }}>
				{favoriteButton()}
			</Container>
		</Container>
		<PickerContainer>{pickers()}</PickerContainer>
		{submitButton()}
		<View style={{ marginHorizontal: '5%', paddingBottom: '2.5%' }}>
			<HTMLView value={description} />
		</View>
	</Fragment>
);

const renderFavoriteButton = (submitFavorite, showSnackBar, isFavorite) => {
	const snackText = isFavorite ? 'Item Removed From Favorites' : 'Added To Favorites';
	const icon = isFavorite ? 'star' : 'star-o';
	const onPress = () => {
		showSnackBar(snackText);
		submitFavorite(isFavorite);
	};
	return (
		<Button useForeground onPress={onPress}>
			<Icon name={icon} size={35} color={Color.secondary} />
		</Button>
	);
};

const renderSubmitButton = (combination, onSubmit, showSnackBar, isProductInCart) => {
	const quantity = parseInt(combination.quantity);
	let textChildren = 'Not Available';
	let onPress = () => showSnackBar('Combination Not Available');

	if (quantity > 1) {
		textChildren = 'Add to Cart';
		onPress = () => {
			onSubmit();
			showSnackBar('Product Added to Cart');
		};
	}

	if (isProductInCart()) {
		textChildren = 'Add to Cart';
		onPress = () => showSnackBar('Product is already added');
	}
	return (
		<SubmitButton
			onPress={onPress}
			textChildren={textChildren}
			style={{
				marginHorizontal: 15,
				marginVertical: 15
			}}
		/>
	);
};

const getPrice = price => parseFloat(price).toFixed(2);
