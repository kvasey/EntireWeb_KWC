import React from "react";
import { Platform } from "react-native";
// import AndroidPay from "./AndroidPay";
import ApplePay from "./ApplePay";
import Card from "./Card";

export default props => [
  Platform.OS === "ios" ? <ApplePay key="apple" {...props} /> : null,
  <Card key="card" {...props} />
];

// export default props => <Card key="card" {...props} />;
