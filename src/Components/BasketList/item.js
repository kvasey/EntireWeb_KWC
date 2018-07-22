import React, { Component } from "react";
import {
  NameContainer,
  Image,
  HeaderWrapper,
  ContentWrapper,
  QuantityContainer,
  RemoveContainer,
  DualContent,
  HeaderQuantity
} from "./styled";
import {
  Button,
  Text,
  Price,
  Quantity,
  Name,
  PickerContainer
} from "../styled/general";
import { Color } from "../../constants";
import {
  productOptionsActivator,
  combinationActivator,
  renderPickers
} from "../ProductDescription";
import { Snackbar } from "react-native-paper";
import { getPrice } from "../util";

export const renderHeader = ({
  name,
  uri,
  combination: { price },
  quantity
}) => (
  <HeaderWrapper>
    <Image source={{ uri }} />
    <NameContainer>
      <Name numberOfLines={2}>{name}</Name>
      <Price>£{getPriceQuantity(price, quantity)}</Price>
    </NameContainer>
    <HeaderQuantity>
      <Text
        style={{
          color: "#000",
          fontWeight: "300",
          marginRight: 8,
          fontSize: 20
        }}
      >
        x
      </Text>
      {quantity}
    </HeaderQuantity>
  </HeaderWrapper>
);

export class AccordionContent extends Component {
  state = {
    snackBarText: "",
    isSnackVisible: false
  };
  updateState = (activationIndex, key) => {
    const productOptions = productOptionsActivator(
      this.props.productOptions,
      activationIndex,
      key
    );
    const combination = combinationActivator(
      this.props.combinations,
      productOptions
    );
    const maxQuantity = parseInt(combination.quantity);

    if (maxQuantity < 1) {
      this.showSnackBar("Not Available");
      return null;
    }
    const quantity =
      this.props.quantity >= maxQuantity ? maxQuantity : this.props.quantity;
    this.setBasketItem({ productOptions, combination, quantity });
  };

  setQuantity = action => {
    const max = this.getMaxQuantity();
    if (action === "+") {
      const quantity = this.props.quantity + 1;
      if (quantity <= max) this.setBasketItem({ quantity });
      else this.showSnackBar("Max Quantity Reached");
      return;
    }
    const quantity = this.props.quantity - 1;
    if (quantity > 0) this.setBasketItem({ quantity });
  };

  getMaxQuantity = () => parseInt(this.props.combination.quantity);

  showSnackBar = snackBarText =>
    this.setState({ ...this.state, isSnackVisible: true, snackBarText }, () =>
      setTimeout(
        () => this.setState({ ...this.state, isSnackVisible: false }),
        2500
      )
    );

  setBasketItem = data => this.props.setBasketItem(this.props.index, data);

  shouldComponentUpdate = (nextProps, nextState) =>
    this.props.combination !== nextProps.combination ||
    this.props.quantity !== nextProps.quantity ||
    this.state.isSnackVisible !== nextState.isSnackVisible;

  render = () => (
    <ContentWrapper>
      <PickerContainer>
        {renderPickers(this.props.productOptions, this.updateState)}
      </PickerContainer>

      <DualContent>
        <RemoveContainer>
          <Button
            onPress={() => this.props.removeBasketItem(this.props.index)}
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "300" }}>Remove</Text>
          </Button>
        </RemoveContainer>

        <QuantityContainer>
          <Button
            onPress={() => this.setQuantity("-")}
            style={{
              height: "100%",
              width: "30%",
              justifyContent: "center",
              alignItem: "center",
              backgroundColor: Color.secondary
            }}
          >
            <Text
              style={{
                backgroundColor: Color.secondary,
                height: "100%",
                width: "30%",
                textAlign: "center",
                fontSize: 26,
                fontWeight: "300",
                color: "#FFF"
              }}
            >
              -
            </Text>
          </Button>

          <Quantity>{this.props.quantity}</Quantity>

          <Button
            onPress={() => this.setQuantity("+")}
            style={{
              height: "100%",
              width: "30%",
              justifyContent: "center",
              alignItem: "center"
            }}
          >
            <Text
              style={{
                backgroundColor: Color.secondary,
                height: "100%",
                width: "30%",
                textAlign: "center",
                fontSize: 26,
                fontWeight: "300",
                color: "#FFF"
              }}
            >
              +
            </Text>
          </Button>
        </QuantityContainer>
      </DualContent>

      <Snackbar visible={this.state.isSnackVisible} onDismiss={() => {}}>
        {this.state.snackBarText}
      </Snackbar>
    </ContentWrapper>
  );
}

const getPriceQuantity = (price, quantity) =>
  (getPrice(price) * quantity).toFixed(2);
