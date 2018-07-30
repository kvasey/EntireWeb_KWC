import React from "react";
import { ScrollView } from "react-native";
import stripe from "tipsi-stripe";
import { renderHeader, AccordionContent } from "./item";
import { Accordion, EmptyComponent } from "../styled/components";
import Footer from "./Footer";

const renderContent = (item, index, setBasketItem, removeBasketItem) => (
  <AccordionContent
    setBasketItem={setBasketItem}
    removeBasketItem={removeBasketItem}
    index={index}
    {...item}
  />
);

export default ({ basket, setBasketItem, removeBasketItem, navigation }) =>
  basket.length > 0 ? (
    <ScrollView>
      <Accordion
        key="Accordion"
        sections={basket}
        renderHeader={renderHeader}
        renderContent={(item, index) =>
          renderContent(item, index, setBasketItem, removeBasketItem)
        }
      />
      <Footer key="Footer" products={basket} navigation={navigation} />
    </ScrollView>
  ) : (
    <EmptyComponent text="Add Some Products" />
  );
