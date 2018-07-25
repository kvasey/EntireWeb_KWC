import React, { Fragment } from "react";
import { FlatList, View } from "react-native";
import { Transition } from "react-navigation-fluid-transitions";
import {
  CategoryImage,
  CategoryTitle,
  CategoryTitleNoImage,
  ItemWrapper,
  Separator
} from "./styled";
import { Button, StateComponent } from "../styled/general";

const renderItem = (
  { item: { id, image, name, childCount, products }, index },
  navigate,
  dataLength
) => (
  <Button
    onPress={() => checkNavigate(childCount, { id, products }, navigate)}
    useForeground
  >
    <ItemWrapper isLast={index === dataLength - 1}>
      {renderButton(image, name)}
    </ItemWrapper>
  </Button>
);

const checkNavigate = (childCount, { id, products }, navigate) =>
  childCount > 0
    ? navigate("ChildCategories", { filterId: id })
    : navigate("Products", { categoryId: products });

const renderButton = (image, name) =>
  image ? (
    <Fragment>
      <CategoryImage source={image} height={150} padHeight={250} />
      <CategoryTitle>{name}</CategoryTitle>
    </Fragment>
  ) : (
    <View style={{ width: "100%" }}>
      <CategoryTitleNoImage>{name}</CategoryTitleNoImage>
      <Separator />
    </View>
  );

export default ({
  filteredData,
  error,
  loading,
  navigation,
  showSeparator
}) => (
  <FlatList
    data={filteredData}
    extraData={filteredData}
    style={{ backgroundColor: "#FFF" }}
    keyExtractor={({ id }, index) => (id * index).toString()}
    renderItem={item => renderItem(item, navigation.push, filteredData.length)}
    ListEmptyComponent={() => (
      <StateComponent error={error} loading={loading} />
    )}
  />
);
