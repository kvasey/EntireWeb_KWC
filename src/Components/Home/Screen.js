import React from "react";
import { FlatList } from "react-native";
import { AdImage, ItemWrapper } from "./styled";
import { Button } from "../styled/general";

export default props => (
  <FlatList
    data={props.data}
    style={{ backgroundColor: "#fff" }}
    keyExtractor={({ url }, index) => (url + index).toString()}
    renderItem={({ item: { url, height, padHeight, data }, index }) => (
      <Button
        useForeground
        style={{ flex: 1 }}
        onPress={() => goTo(data, props.navigation)}
      >
        <ItemWrapper
          style={index === data.length - 1 ? { marginBottom: "5%" } : {}}
        >
          <AdImage source={url} height={height} padHeight={padHeight} />
        </ItemWrapper>
      </Button>
    )}
  />
);

const goTo = ({ id, categoryId, navigation }, { navigate, push }) => {
  switch (navigation) {
    case "CATEGORY":
      return navigate("ChildCategories", { filterId: id });
    case "PRODUCT":
      return push("Products", { productId: id, categoryId });
    default:
      return null;
  }
};
