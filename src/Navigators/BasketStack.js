import React from "react";
import { createStackNavigator } from "react-navigation";
import InnerHeader from "../Components/styled/Headers/InnerHeader";
import Home from "../Components/Home";
import BasketList from "../Components/BasketList";
import AddressSelect from "../Components/Checkout/AddressSelect";
import Summary from "../Components/Checkout/Summary";
import CarrierSelect from "../Components/Checkout/CarrierSelect";

export default createStackNavigator(
  {
    BasketList,
    AddressSelect,
    InvoiceSelect: AddressSelect,
    CarrierSelect,
    Summary,
    Checkout: Home
  },
  {
    initialRouteName: "BasketList",
    navigationOptions: {
      header: props => <InnerHeader {...props} />
    }
  }
);
