import React from "react";
import { FluidNavigator } from "react-navigation-fluid-transitions";
import { createStackNavigator } from "react-navigation";
import Login from "../Components/Auth/Login";
import Registration from "../Components/Auth/Registration";
import Address from "../Components/Profile/Address";
import InnerHeader from "../Components/styled/Headers/InnerHeader";
import Home from "../Components/Home";
import Profile from "../Components/Profile";

export default createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null
      }
    },
    Address: {
      screen: Address,
      navigationOptions: {
        header: props => <InnerHeader {...props} />
      }
    },
    Auth: {
      navigationOptions: {
        header: null
      },
      screen: FluidNavigator(
        {
          Login,
          Registration
        },
        {
          initialRouteName: "Login"
        }
      )
    }
  },
  {
    initialRouteName: "Auth",
    swipeEnabled: false,
    navigationOptions: { gesturesEnabled: false }
  }
);
