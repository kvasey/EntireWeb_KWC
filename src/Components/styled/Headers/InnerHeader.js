import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableNativeFeedback } from 'react-native';
import { Color } from '../../../constants';
import { RootHeaderWrapper, LeftHeaderButton } from './index';
import { Button } from '../general';

export default ({ navigation: { goBack } }) => (
  <RootHeaderWrapper>
    <Button
      onPress={() => goBack(null)}
      background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
    >
      <LeftHeaderButton>
        <Icon name="arrow-left" size={25} color={Color.main} />
      </LeftHeaderButton>
    </Button>
  </RootHeaderWrapper>
);
