import styled from "styled-components";
import { Color } from "../../../constants";

const margin = "2.5%";

export const Price = styled.Text`
  padding-horizontal: 5%;
  padding-vertical: ${margin};
  font-size: 20;
  font-weight: bold;
`;
export const Name = styled.Text`
  padding-horizontal: 5%;
  font-size: 22;
`;

export const Reference = styled.Text`
  padding-horizontal: 5%;
  color: ${Color.main};
  font-size: 16;
`;
export const Line = styled.View`
  margin-bottom: ${margin};
  background-color: #eee;
  height: 1;
  width: 100%;
`;
export const ItemWrapper = styled.View`
  flex: 1;
  height: 200;
  position: relative;
  padding-top: ${margin};
  padding-horizontal: ${margin};
  padding-bottom: ${({ isLast }) => (isLast ? margin : "auto")};
  justify-content: center;
  background-color: #fff;
  border-width: 1;
  border-color: #eee;
`;
