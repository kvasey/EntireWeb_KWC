import React from "react";
import { Platform, ActivityIndicator, Dimensions } from "react-native";
import styled from "styled-components";
import { Color } from "../../constants";

export const { width, height } = Dimensions.get("window");

const TouchableIOS = styled.TouchableOpacity``;
const TouchableAndroid = styled.TouchableNativeFeedback``;

export const Button =
  Platform.OS === "android" ? TouchableAndroid : TouchableIOS;

export const ButtonInner = styled.View`
  height: 55;
  border-radius: 5;
  background-color: ${Color.secondary};
  align-items: center;
  justify-content: center;
`;

export const ButtonInnerText = styled.Text`
  font-size: 22;
  text-align: center;
  font-weight: 300;
  color: #fff;
`;

export const SubmitButton = ({ onPress, textChildren, style, textStyle }) => (
  <Button onPress={onPress}>
    <ButtonInner style={style}>
      <ButtonInnerText style={textStyle}>
        {typeof textChildren === "string" ? textChildren : textChildren()}
      </ButtonInnerText>
    </ButtonInner>
  </Button>
);

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

export const Container = styled.View`
  flex: ${({ flex }) => flex || "1"};
  flex-direction: ${({ flexDirection }) => flexDirection || "column"};
  justify-content: ${({ justifyContent }) => justifyContent || "space-around"};
  align-items: ${({ alignItems }) => alignItems || "center"};
`;

export const StateComponent = ({ error, loading }) => (
  <StateContainer>
    {loading && <ActivityIndicator size="large" color={Color.secondary} />}
    <StateText>{error && JSON.stringify(error, null, 2)}</StateText>
  </StateContainer>
);
