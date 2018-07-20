import React from "react";
import { createStackNavigator } from "react-navigation";
import InnerHeader from "../Components/styled/Headers/InnerHeader";
import Home from "../Components/Home";
import BasketList from "../Components/BasketList";

export default createStackNavigator(
  {
    BasketList,
    Checkout: {
      screen: Home
    }
  },
  {
    initialRouteName: "BasketList",
    navigationOptions: {
      header: props => <InnerHeader {...props} />
    }
  }
);
