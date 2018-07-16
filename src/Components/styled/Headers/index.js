import styled from "styled-components";
import { width } from "../general";

export const RootHeaderWrapper = styled.View`
  height: 50;
  elevation: 1;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LogoImage = styled.Image`
  width: ${width * 0.3};
  height: 50;
`;
export const LeftHeaderButton = styled.View`
  width: 100%;
  justify-content: space-around;
  align-items: center;
  height: 50;
`;
export const MiddleHeaderButton = styled.View`
  width: 100%;
  justify-content: space-around;
  align-items: center;
  height: 50;
`;
export const RightHeaderButton = styled.View`
  width: 100%;
  justify-content: space-around;
  align-items: center;
  height: 50;
`;

export const Text = styled.Text``;