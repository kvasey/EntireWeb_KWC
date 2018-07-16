import React, { Component } from "react";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Feather";
import { TouchableNativeFeedback, Platform } from "react-native";
import Picker from "react-native-picker";
import { Color, SortTypes } from "../../../constants";
import { setSortType } from "../../Products/action";
import {
  RootHeaderWrapper,
  LeftHeaderButton,
  MiddleHeaderButton,
  RightHeaderButton,
  Text
} from "./index";
import { Button } from "../general";

class ProductHeader extends Component {
  componentDidMount = () => {
    Picker.init({
      pickerData: SortTypes,
      selectedValue: [0],
      pickerBg: [255, 255, 255, 1],
      pickerToolBarBg: [238, 238, 238, 1],
      pickerCancelBtnColor: [182, 30, 137, 1],
      pickerConfirmBtnColor: [182, 30, 137, 1],
      pickerConfirmBtnText: "Confirm",
      pickerCancelBtnText: "Cancel",
      pickerTitleText: "",
      pickerTextEllipsisLen: 20,
      pickerFontSize: 20,
      pickerFontFamily: Platform.OS === "android" ? "Roboto" : "San Francisco",
      onPickerConfirm: data => this.props.setSortType(data[0])
    });
  };

  render = () => {
    const {
      navigation: { navigate, goBack },
      itemAmount,
      sortType
    } = this.props;
    return (
      <RootHeaderWrapper>
        <Button
          onPress={() => goBack(null)}
          background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          style={{ flex: 0.2 }}
        >
          <LeftHeaderButton>
            <Icon name="arrow-left" size={25} color={Color.main} />
          </LeftHeaderButton>
        </Button>

        <Button
          onPress={() => Picker.show()}
          useForeground
          background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          style={{ flex: 0.4 }}
        >
          <MiddleHeaderButton
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>{sortType}</Text>
            <Icon name="arrow-down" size={15} color={Color.main} />
          </MiddleHeaderButton>
        </Button>

        <Button
          onPress={() => null}
          background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          style={{ flex: 0.2 }}
        >
          <RightHeaderButton>
            <Text>{`items: ${itemAmount}`}</Text>
          </RightHeaderButton>
        </Button>
      </RootHeaderWrapper>
    );
  };
}

export default connect(
  ({ products }) => ({
    itemAmount: products.data.length,
    sortType: products.sortType
  }),
  dispatch => ({ setSortType: type => dispatch(setSortType(type)) })
)(ProductHeader);
