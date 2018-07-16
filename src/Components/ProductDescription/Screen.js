import React, { Fragment } from 'react';
import {
  Text, View, ActivityIndicator, Platform,
} from 'react-native';
import Image from 'react-native-image-progress';
import { Price, Name, ItemWrapper } from './styled';
import { Button, StateComponent } from '../styled/general';
import { Color } from '../../constants';

export default ({ product }) => (
  <View>
    <Text>
      {JSON.stringify(product, null, 2)}
    </Text>
  </View>
);
