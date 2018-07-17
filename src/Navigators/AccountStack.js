import React from "react";
import { FluidNavigator } from "react-navigation-fluid-transitions";
import { createStackNavigator } from "react-navigation";
import Login from "../Components/Auth/Login";
import Registration from "../Components/Auth/Registration";
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
          initialRouteName: "Login",
          navigationOptions: { gesturesEnabled: false }
        }
      )
    }
  },
  {
    initialRouteName: "Auth"
  }
);
