import { createBottomTabNavigator } from "react-navigation";
import Tabs from "./Tabs";
import Basket from "./BasketStack";
import InnerHeader from "../Components/styled/Headers/InnerHeader";

export default createBottomTabNavigator(
  {
    Tabs,
    Basket
  },
  {
    initialRouteName: "Tabs",
    tabBarComponent: () => null,
    swipeEnabled: false
  }
);
