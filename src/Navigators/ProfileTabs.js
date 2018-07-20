import { createMaterialTopTabNavigator } from "react-navigation";
import Home from "../Components/Home";
import Orders from "../Components/Profile/Orders";
import Addresses from "../Components/Profile/Addresses";
import { Color } from "../constants";

export default createMaterialTopTabNavigator(
  {
    Orders,
    Addresses
  },
  {
    tabBarPosition: "top",
    initialRouteName: "Orders",
    tabBarOptions: {
      upperCaseLabel: false,
      indicatorStyle: {
        height: 0
      },
      activeTintColor: Color.secondary,
      inactiveTintColor: Color.main,
      style: {
        height: 40,
        padding: 0,
        backgroundColor: "#fff"
      },
      tabStyle: {
        height: 40,
        padding: 0,
        margin: 0,
        justifyContent: "center",
        alignItems: "center"
      }
    },
    swipeEnabled: false
  }
);
