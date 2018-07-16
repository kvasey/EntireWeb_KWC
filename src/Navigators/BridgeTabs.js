import { createBottomTabNavigator } from 'react-navigation';
import Tabs from './Tabs';
import Home from '../Components/Home';

export default createBottomTabNavigator(
  {
    Tabs,
    Basket: {
      screen: Home,
    },
  },
  {
    initialRouteName: 'Tabs',
    tabBarComponent: () => null,
    swipeEnabled: false,
  },
);
