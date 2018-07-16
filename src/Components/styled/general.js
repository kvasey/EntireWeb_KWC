import React from 'react';
import { Platform, ActivityIndicator, Dimensions } from 'react-native';
import styled from 'styled-components';
import { Color } from '../../constants';

export const { width, height } = Dimensions.get('window');

const TouchableIOS = styled.TouchableOpacity``;
const TouchableAndroid = styled.TouchableNativeFeedback``;

export const Button = Platform.OS === 'android' ? TouchableAndroid : TouchableIOS;

const StateContainer = styled.View`
  height: ${height};
  width: ${width};
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #fff;
`;

const StateText = styled.Text`
  color: ${Color.main};
  font-size: 18;
  padding: 5%;
`;

export const StateComponent = ({ error, loading }) => (
  <StateContainer>
    {loading && <ActivityIndicator size="large" color={Color.secondary} />}
    <StateText>
      {error && JSON.stringify(error, null, 2)}
    </StateText>
  </StateContainer>
);
