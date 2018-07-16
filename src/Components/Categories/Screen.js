import React, { Fragment } from 'react';
import { FlatList, Text } from 'react-native';
import {
  CategoryImage,
  CategoryTitle,
  CategoryTitleNoImage,
  ItemWrapper,
  Separator,
} from './styled';
import { Button, StateComponent } from '../styled/general';

const renderItem = ({
  item: {
    id, image, name, childCount,
  }, index,
}, navigate, dataLength) => (
  <Button onPress={() => checkNavigate(childCount, id, navigate)} useForeground style={{ flex: 1 }}>
    <ItemWrapper isLast={index === dataLength - 1}>
      {renderButton(image, name)}
    </ItemWrapper>
  </Button>
);

const checkNavigate = (childCount, id, navigate) => (childCount > 0
  ? navigate('ChildCategories', { filterId: id })
  : navigate('Products', { categoryId: id }));

const renderButton = (image, name) => (image ? (
  <Fragment>
    <CategoryImage source={image} height={150} padHeight={250} />
    <CategoryTitle>
      {name}
    </CategoryTitle>
  </Fragment>
) : (
  <CategoryTitleNoImage>
    {name}
  </CategoryTitleNoImage>
));

export default ({
  filteredData, error, loading, navigation, showSeparator,
}) => (
  <FlatList
    data={filteredData}
    style={{ backgroundColor: '#FFF' }}
    keyExtractor={({ id }, index) => (id * index).toString()}
    renderItem={item => renderItem(item, navigation.push, filteredData.length)}
    ItemSeparatorComponent={showSeparator ? Separator : null}
    ListEmptyComponent={() => <StateComponent error={error} loading={loading} />}
  />
);
