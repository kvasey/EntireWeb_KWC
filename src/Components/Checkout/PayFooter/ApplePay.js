import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import stripe from "tipsi-stripe";
import Button from "./Button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CURRENCY = "GBP";

export default class extends PureComponent {
  state = {
    loading: false,
    allowed: false,
    complete: true,
    status: null,
    token: null
  };

  async componentDidMount() {
    const allowed = await stripe.deviceSupportsApplePay();

    console.log(allowed);
    this.setState(
      {
        allowed
      },
      () => console.log(this.state)
    );
  }

  handleCompleteChange = complete => this.setState({ complete });

  handleApplePayPress = async () => {
    const {
      productCost,
      user,
      invoice,
      carrier,
      payStripe,
      basket,
      navigation
    } = this.props;

    try {
      this.setState({
        loading: true,
        status: null,
        token: null
      });

      const items = basket.map(
        ({ name, reference, combination, quantity }) => ({
          label: `${name} #${reference}`,
          amount: `${combination.price * quantity}`
        })
      );
      const shippingCost = parseFloat(carrier.price).toFixed(2);

      const options = {
        currencyCode: CURRENCY,
        countryCode: "GB",
        shippingMethods: [
          {
            id: carrier.id_carrier,
            label: carrier.name,
            detail: carrier.delay,
            amount: `${shippingCost}`
          }
        ]
      };

      const token = await stripe.paymentRequestWithApplePay(items, options);

      this.setState({ loading: false, token });

      await stripe.completeApplePayRequest();

      if (token) {
        payStripe({
          currency: CURRENCY,
          amount: (
            (parseFloat(productCost) + parseFloat(shippingCost)) *
            100
          ).toFixed(0),
          description: `${user.id}aPAY`,
          token: token.tokenId
        });
        navigation.navigate("Success");
      }
      this.setState({ status: "Apple Pay payment completed" });
      if (!token) {
        await stripe.cancelApplePayRequest();
        this.setState({ status: "Apple Pay payment canceled" });
      }
    } catch (error) {
      await stripe.cancelApplePayRequest();
      this.setState({ loading: false, status: `Error: ${error.message}` });
    }
  };

  handleSetupApplePayPress = () => stripe.openApplePaySetup();

  render = () =>
    this.state.allowed ? (
      <View>
        <Button
          disabled={this.state.loading || !this.state.allowed}
          onPress={this.handleApplePayPress}
          text={
            this.state.loading
              ? "Loading..."
              : !this.state.allowed
                ? "Not supported"
                : "Pay"
          }
          icon="apple"
          isApplePay
        />
        <Text style={{ textAlign: "center", fontSize: 18 }}>
          {this.state.status}
        </Text>
      </View>
    ) : null;
}
