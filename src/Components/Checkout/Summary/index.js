import React, { Component, Fragment } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { createOrder } from "../orderActions";
import { OrderContentContainer } from "../../Profile/styled";
import { SummaryText } from "../styled";
import {
  renderHeader,
  renderAddresses,
  renderCarrier,
  renderProducts
} from "../../Profile/Orders/Screen";
import PayFooter from "../PayFooter";
import payStripe from "../stripeActions";

const Container = ({
  deliveries,
  deliveryIndex,
  addresses,
  addressIndex,
  invoiceIndex,
  payStripe,
  productCost,
  stripe,
  basket,
  user,
  navigation
}) => {
  const carrier = deliveries[deliveryIndex];
  const address = addresses[addressIndex];
  const invoice = addresses[invoiceIndex];

  return (
    <Fragment>
      <SummaryText>
Order Summary
</SummaryText>
      <ScrollView>
        {renderHeader(
          {
            total_paid: parseFloat(productCost) + parseFloat(carrier.price),
            id: "pending",
            payment: "Stripe"
          },
          { height: 120 }
        )}
        <OrderContentContainer>
          {renderAddresses(invoice, address)}
          {renderCarrier({ ...carrier, ...carrier.carrier }, carrier.price)}
          {renderProducts(
            basket.map(
              ({
                id,
                name,
                productOptions,
                reference,
                combination,
                quantity
              }) => ({
                product_name: name,
                product_id: id,
                product_reference: reference,
                product_price: combination.price,
                product_quantity: quantity
              })
            )
          )}
        </OrderContentContainer>
        <PayFooter
          navigation={navigation}
          productCost={productCost}
          payStripe={payStripe}
          stripe={stripe}
          carrier={carrier}
          user={user}
          invoice={invoice}
          basket={basket}
        />
      </ScrollView>
    </Fragment>
  );
};

const mapStateToProps = ({
  checkout: {
    stripe,
    deliveryIndex,
    deliveries,
    addressIndex,
    invoiceIndex,
    productCost
  },
  basket,
  addresses: {
    data: { addresses }
  },
  user
}) => ({
  basket,
  stripe,
  user,
  productCost,
  deliveryIndex,
  addressIndex,
  deliveries,
  invoiceIndex,
  addresses
});
const mapDispatchToProps = dispatch => ({
  createOrder: () => dispatch(createOrder()),
  payStripe: query => dispatch(payStripe(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
