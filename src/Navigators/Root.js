import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import RootHeader from '../Components/styled/Headers/RootHeader';

import BridgeTabs from './BridgeTabs';

export default createStackNavigator({
  Root: {
    screen: BridgeTabs,
    navigationOptions: props => ({
      header: props => <RootHeader {...props} />,
    }),
  },
});
