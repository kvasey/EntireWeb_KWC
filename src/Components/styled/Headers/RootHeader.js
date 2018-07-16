import React from 'react';
import { TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import logo from '../../../../assets/logo.png';
import { Color } from '../../../constants';
import {
  RootHeaderWrapper,
  LeftHeaderButton,
  MiddleHeaderButton,
  RightHeaderButton,
  LogoImage,
} from './index';
import { Button } from '../general';

export default ({ navigation: { navigate } }) => (
  <RootHeaderWrapper>
    <Button
      onPress={() => navigate('Basket')}
      background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
    >
      <LeftHeaderButton>
        <Icon name="search" size={25} color={Color.main} />
      </LeftHeaderButton>
    </Button>

    <Button
      onPress={() => navigate('Home')}
      useForeground
      background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
    >
      <MiddleHeaderButton>
        <LogoImage source={logo} resizeMode="center" />
      </MiddleHeaderButton>
    </Button>

    <Button
      onPress={() => navigate('Basket')}
      background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
    >
      <RightHeaderButton>
        <Icon name="shopping-cart" size={25} color={Color.main} />
      </RightHeaderButton>
    </Button>
  </RootHeaderWrapper>
);
