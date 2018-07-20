import React from "react";
import { FlatList } from "react-native";
import { AdImage, ItemWrapper } from "./styled";
import { Button } from "../styled/general";

export default ({ data }) => (
  <FlatList
    data={data}
    style={{ backgroundColor: "#fff" }}
    keyExtractor={({ url }, index) => (url + index).toString()}
    renderItem={({ item: { url, height, padHeight }, index }) => (
      <Button useForeground style={{ flex: 1 }}>
        <ItemWrapper
          style={index === data.length - 1 ? { marginBottom: "5%" } : {}}
        >
          <AdImage source={url} height={height} padHeight={padHeight} />
        </ItemWrapper>
      </Button>
    )}
  />
);
