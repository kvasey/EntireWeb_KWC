import React from "react";
import { ActivityIndicator } from "react-native";
import { Button, Name, Price } from "../../styled/general";
import { Text } from "../styled";
import { SubmitButton } from "../../styled/components";
import { OrderContainer, OuterOrderContainer } from "../../Profile/styled";
import { getPrice } from "../../util";
import { Color } from "../../../constants";

export default props => (
  <OrderContainer key="Data" style={{ height: "100%" }}>
    <OuterOrderContainer
      style={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <Text>Product Cost:</Text>
      <Price style={{ fontSize: 18 }}>
        £
        {props.productCost}
      </Price>
    </OuterOrderContainer>
    <OuterOrderContainer
      style={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <Text>Shipping Cost:</Text>
      {checkLoadingPrice(props, getShippingCost)}
    </OuterOrderContainer>
    <OuterOrderContainer
      style={{
        marginBottom: 10,
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Text>Total Cost:</Text>
      {checkLoadingPrice(props, getTotalCost)}
    </OuterOrderContainer>
    <SubmitButton
      textChildren={props.error || "Checkout"}
      onPress={
        props.error
          ? () => props.navigation.navigate("Auth")
          : () => console.log("hey")
      }
    />
  </OrderContainer>
);

const getShippingCost = ({ deliveries, deliveryIndex }) =>
  parseFloat(deliveries[deliveryIndex].price).toFixed(2);

const getTotalCost = ({ productCost, ...rest }) =>
  parseFloat(productCost) + parseFloat(getShippingCost(rest));

const checkLoadingPrice = ({ loading, error, ...rest }, getLocalPrice) =>
  loading || error ? (
    <ActivityIndicator size="small" color={Color.secondary} />
  ) : (
    <Price>
      £
      {getPrice(getLocalPrice(rest))}
    </Price>
  );
