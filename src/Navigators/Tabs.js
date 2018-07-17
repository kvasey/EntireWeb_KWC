import React from "react";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Color } from "../constants";
import Home from "../Components/Home";
import Account from "./AccountStack";
import CategoryStack from "./CategoryStack";

export default createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            size={getIconSize()}
            name="home"
            color={getTintColor(focused)}
          />
        )
      }
    },
    Categories: {
      screen: CategoryStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            size={getIconSize()}
            name="layers"
            color={getTintColor(focused)}
          />
        )
      }
    },
    Favorites: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            size={getIconSize()}
            name="star"
            color={getTintColor(focused)}
          />
        )
      }
    },
    Account: {
      screen: Account,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            size={getIconSize()}
            name="user"
            color={getTintColor(focused)}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    lazy: false,
    activeTintColor: Color.main,
    inactiveTintColor: Color.main,
    barStyle: {
      backgroundColor: "#FFF",
      borderStyle: "solid",
      borderTopWidth: 1,
      borderColor: "#eee"
    }
  }
);

const getTintColor = focused => (focused ? Color.secondary : Color.main);

const getIconSize = () => (Platform.isPad ? 64 : 20);
