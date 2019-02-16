import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CardIcon from "react-native-vector-icons/FontAwesome";
import stripe from "tipsi-stripe";
import { Button, ButtonInner, ButtonInnerText } from "../../styled/general";
import { MiniCardContainer } from "../styled";

stripe.setOptions({
  publishableKey: __DEV__
    ? "pk_test_rlTe5L9vtemCGSAJVOZFLk45"
    : "pk_live_BIMShd0bkJUVp9xdKlEPNvlc",
  androidPayMode: "test",
  merchantId: "merchant.com.stripe.kwc"
});

export default ({
  disabled,
  onPress,
  text,
  icon,
  cards = [],
  isApplePay = false
}) => (
  <Button disabled={disabled} onPress={onPress}>
    <ButtonInner
      style={
        isApplePay
          ? {
              backgroundColor: "#000",
              marginVertical: 5,
              marginHorizontal: 10,
              marginBottom: 0
            }
          : { marginVertical: 5, marginHorizontal: 10, marginBottom: 20 }
      }
    >
      {disabled ? (
        <ActivityIndicator />
      ) : (
        <ButtonInnerText>
          {isApplePay ? "Buy With " : ""}
          {!isApplePay ? " " : ""}
          {icon ? <Icon name={icon} size={25} color="#FFF" /> : null}
          {isApplePay ? (
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>{text} </Text>
          ) : (
            text
          )}
        </ButtonInnerText>
      )}
    </ButtonInner>
  </Button>
);
