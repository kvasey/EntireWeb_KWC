import styled from 'styled-components';
import { Platform } from 'react-native';
import { Color } from '../../../constants';

const margin = '5%';
const getImage = ({ height, padHeight }) => (Platform.isPad ? padHeight : height);

export const CategoryImage = styled.Image`
  width: 100%;
  height: ${props => getImage(props)};
  border-radius: 5;
`;
export const CategoryTitle = styled.Text`
  position: absolute;
  width: 50%;
  height: 100%;
  font-size: 22;
  top: 30%;
  left: 5%;
  font-family: 'JosefinSans-Regular';
`;

export const CategoryTitleNoImage = styled.Text`
  width: 100%;
  height: 50;
  padding: 1%;
  font-size: 20;
  border-radius: 5;
  font-family: 'JosefinSans-Regular';
`;

export const Separator = styled.View`
  height: 1;
  border-radius: 100;
  margin-horizontal: ${margin};
  background-color: ${Color.main};
`;

export const ItemWrapper = styled.View`
  position: relative;
  margin-top: ${margin};
  margin-horizontal: ${margin};
  margin-bottom: ${({ isLast }) => (isLast ? margin : 'auto')};
  background-color: #fff;
`;
