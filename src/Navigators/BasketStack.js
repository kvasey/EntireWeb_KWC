import React from "react";
import { createStackNavigator } from "react-navigation";
import InnerHeader from "../Components/styled/Headers/InnerHeader";
import BasketList from "../Components/BasketList";
import AddressSelect from "../Components/Checkout/AddressSelect";
import Address1 from "../Components/Profile/Address";
import Summary from "../Components/Checkout/Summary";
import CarrierSelect from "../Components/Checkout/CarrierSelect";
import Success from "../Components/Checkout/SuccessScreen";

export default createStackNavigator(
  {
    BasketList,
    AddressSelect,
    InvoiceSelect: AddressSelect,
    CarrierSelect,
    Summary,
    Success,
    Address1
  },
  {
    initialRouteName: "BasketList",
    navigationOptions: {
      header: props => <InnerHeader {...props} />
    }
  }
);
