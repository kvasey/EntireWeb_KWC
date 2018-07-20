import React, { Fragment } from "react";
import { FlatList, Platform } from "react-native";
import { Transition } from "react-navigation-fluid-transitions";
import { renderImage } from "../Products/Screen";
import { Name, ItemWrapper, Line } from "../Products/styled";
import { Button } from "../styled/general";
import { StateComponent, EmptyComponent } from "../styled/components";
import { Color } from "../../constants";

const renderItem = (
  { item: { id, name, uri, categoryId }, index },
  dataLength,
  { push }
) => (
  <Button
    onPress={() => push("Products", { productId: id, categoryId })}
    useForeground
    style={{ flex: 1 }}
  >
    <ItemWrapper isLast={index === dataLength - 1}>
      <Transition shared={`${id}`}>{renderImage(uri)}</Transition>
      <Line />
      <Name numberOfLines={2}>{name}</Name>
    </ItemWrapper>
  </Button>
);

export default ({ favorites, navigation }) => (
  <FlatList
    data={favorites}
    extraData={favorites}
    numColumns={Platform.isPad ? 3 : 2}
    style={{ backgroundColor: "#FFF" }}
    keyExtractor={({ id }, index) => (id * index).toString()}
    renderItem={item => renderItem(item, favorites.length, navigation)}
    ListEmptyComponent={() => <EmptyComponent text="Add some Favorites." />}
  />
);
