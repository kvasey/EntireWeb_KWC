import React from "react";
import { Platform } from "react-native";
import AndroidPay from "./AndroidPay";
import ApplePay from "./ApplePay";
import Card from "./Card";

export default props => [
  Platform.OS === "android" ? (
    <AndroidPay {...props} />
  ) : (
    <ApplePay {...props} />
  ),
  <Card {...props} />
];
