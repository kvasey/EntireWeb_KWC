import React from "react";
import { Price } from "../../styled/general";
import { Text } from "../styled";
import { SubmitButton } from "../../styled/components";
import { OrderContainer, OuterOrderContainer } from "../../Profile/styled";
import { getPrice } from "../../util";

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
    {!checkLoading(props, getShippingCost) && (
      <OuterOrderContainer
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Text>Shipping Cost:</Text>
        <Price>
          £
          {getPrice(getShippingCost(props))}
        </Price>
      </OuterOrderContainer>
    )}
    {!checkLoading(props) && (
      <OuterOrderContainer
        style={{
          marginBottom: 10,
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Text>Total Cost:</Text>
        <Price>
          £
          {getPrice(getTotalCost(props))}
        </Price>
      </OuterOrderContainer>
    )}
    <SubmitButton
      textChildren={props.error || "Checkout"}
      onPress={
        props.error
          ? () => props.navigation.navigate("Auth")
          : () =>
              props.navigation.navigate("AddressSelect", { select: "address" })
      }
    />
  </OrderContainer>
);

const getShippingCost = ({ deliveries, deliveryIndex }) =>
  parseFloat(deliveries[deliveryIndex].price).toFixed(2);

const getTotalCost = ({ productCost, ...rest }) =>
  parseFloat(productCost) + parseFloat(getShippingCost(rest));

const checkLoading = ({ loading, error }) => loading || error;
