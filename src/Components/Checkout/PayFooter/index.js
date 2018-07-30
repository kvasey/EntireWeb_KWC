import React from "react";
import { Platform } from "react-native";
import AndroidPay from "./AndroidPay";
import ApplePay from "./ApplePay";
import Card from "./Card";

export default props => [
  Platform.OS === "android" ? (
    <AndroidPay key="android" {...props} />
  ) : (
    <ApplePay key="apple" {...props} />
  ),
  <Card key="card" {...props} />
];
