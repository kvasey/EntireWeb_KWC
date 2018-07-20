import React, { Fragment } from "react";
import stripe from "tipsi-stripe";
import { renderHeader, AccordionContent } from "./item";
import { Button, Name, Price } from "../styled/general";
import { Text } from "./styled";
import { SubmitButton, Accordion, EmptyComponent } from "../styled/components";
import { OrderContainer, OuterOrderContainer } from "../Profile/styled";
import Footer from "./Footer";

const renderContent = (item, index, setBasketItem, removeBasketItem) => (
  <AccordionContent
    setBasketItem={setBasketItem}
    removeBasketItem={removeBasketItem}
    index={index}
    {...item}
  />
);

export default ({
  basket,
  setBasketItem,
  removeBasketItem,
  shippingCost,
  productCost,
  totalCost,
  navigation
}) =>
  basket.length > 0 ? (
    [
      <Accordion
        key="Accordion"
        sections={basket}
        renderHeader={renderHeader}
        renderContent={(item, index) =>
          renderContent(item, index, setBasketItem, removeBasketItem)
        }
      />,
      <Footer key="Footer" products={basket} navigation={navigation} />
    ]
  ) : (
    <EmptyComponent text="Add Some Products" />
  );

// stripe.setOptions({
//   publishableKey: "pk_test_rlTe5L9vtemCGSAJVOZFLk45",
//   // publishableKey: "pk_live_BIMShd0bkJUVp9xdKlEPNvlc",
//   androidPayMode: "test",
//   merchantId: "merchant.com.stripe.kwc"
// });

// const doStripe = async () => {
//   try {
//     const items = [1, 2, 3, 4, 5].map(p => ({
//       label: `NAME #reference`,
//       amount: `${p}`
//     }));

//     const options = {
//       currencyCode: "GBP",
//       countryCode: "GB",
//       shippingMethods: [
//         {
//           id: "34",
//           label: "random",
//           detail: "random2",
//           amount: `${56}`
//         }
//       ]
//     };

//     const token = await stripe.paymentRequestWithApplePay(items, options);

//     alert(token);
//     // this.setState({ loading: false, token });

//     await stripe.completeApplePayRequest();
//     // token
//     //   ? this.props.payStripe({
//     //       currency: "GB",
//     //       amount: 123,
//     //       description: `${hi}aPAY`,
//     //       token: token.tokenId
//     //     })
//     //   : null;
//     // this.setState({ status: "Apple Pay payment completed" });
//     Alert.alert("Apple Pay payment complete");
//     if (!token) {
//       await stripe.cancelApplePayRequest();
//       Alert.alert("Apple Pay payment canceled");
//       // this.setState();
//     }
//   } catch (error) {
//     await stripe.cancelApplePayRequest();
//     console.log(error);
//     // this.setState({ loading: false, status: `Error: ${error.message}` });
//   }
// };
