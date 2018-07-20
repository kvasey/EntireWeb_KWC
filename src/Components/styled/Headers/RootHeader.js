import React from "react";
import { TouchableNativeFeedback, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import IconBadge from "react-native-icon-badge";
import logo from "../../../../assets/logo.png";
import { Color } from "../../../constants";
import {
  RootHeaderWrapper,
  LeftHeaderButton,
  MiddleHeaderButton,
  RightHeaderButton,
  LogoImage
} from "./index";
import { Button } from "../general";

export default ({ navigation: { navigate } }) => (
  <RootHeaderWrapper>
    <Button
      onPress={() => navigate("Basket")}
      background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      style={{ flex: 0.2 }}
    >
      <LeftHeaderButton>
        <Icon name="search" size={25} color={Color.main} />
      </LeftHeaderButton>
    </Button>

    <Button
      onPress={() => navigate("Home")}
      useForeground
      background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      style={{ flex: 0.4 }}
    >
      <MiddleHeaderButton>
        <LogoImage source={logo} resizeMode="center" />
      </MiddleHeaderButton>
    </Button>
    <Button
      onPress={() => navigate("Basket")}
      background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      style={{ flex: 0.2 }}
    >
      <RightHeaderButton>
        <BasketIcon>
          <Icon name="shopping-cart" size={25} color={Color.main} />
        </BasketIcon>
      </RightHeaderButton>
    </Button>
  </RootHeaderWrapper>
);

const BasketIcon = connect(
  ({ basket }) => ({
    length: basket.length
  }),
  null
)(({ length, children }) => (
  <IconBadge
    MainElement={children}
    BadgeElement={<Text style={{ color: "#FFF", fontSize: 12 }}>
{length}
</Text>}
    IconBadgeStyle={{
      top: -10,
      right: -12,
      minWidth: 18,
      height: 18,
      borderRadius: 20,
      backgroundColor: Color.secondary
    }}
    Hidden={length < 1}
  />
));
