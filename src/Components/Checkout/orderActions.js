import { setInStore, checkResult } from "../util";
import { CART_CREATE_URL, ORDER_CREATE_URL } from "../../constants";
import { calculateWeight } from "./action";

export const orderActions = {
  LOADING: "ORDER/CART_LOADING",
  ERROR: "ORDER/CART_ERROR",
  CART_DONE: "CART_DONE",
  ORDER_DONE: "ORDER_DONE"
};

export const setOrderDone = data => ({
  type: orderActions.ORDER_DONE,
  data
});

export const setCartDone = data => ({
  type: orderActions.CART_DONE,
  data
});

export const openFetcher = async (fetchData, setDone, dispatch, expect) => {
  dispatch(setInStore(null, orderActions.ERROR));
  dispatch(setInStore(true, orderActions.LOADING));
  try {
    const result = await fetchData();
    if (
      checkResult(result, dispatch, error =>
        setInStore(error, orderActions.ERROR)
      )
    ) {
      dispatch(setDone(result[expect]));
      dispatch(setInStore(false, orderActions.LOADING));
    }
  } catch (error) {
    dispatch(setInStore(false, orderActions.LOADING));
    dispatch(setInStore(error, orderActions.ERROR));
  }
};

export const createOrder = () => async (dispatch, getState) => {
  dispatch(setInStore(null, orderActions.ERROR));
  dispatch(setInStore(true, orderActions.LOADING));
  const {
    addresses: {
      data: { addresses }
    },
    checkout,
    user,
    basket
  } = getState();

  const address = addresses[checkout.addressIndex];
  const invoice = addresses[checkout.invoiceIndex];
  const carrier = checkout.deliveries[checkout.deliveryIndex];

  let body = jsonToCartXML({
    invoiceId: invoice.id,
    addressId: address.id,
    customerId: user.id,
    customerSecureKey: user.secureKey,
    carrierId: carrier.id_carrier,
    basket
  });

  try {
    let result = await fetch(CART_CREATE_URL, {
      method: "POST",
      body
    });
    const cartResult = await result.json();
    if (
      checkResult(result, dispatch, error =>
        setInStore(error, orderActions.ERROR)
      )
    ) {
      dispatch(setCartDone(cartResult.cart));
      body = jsonToOrderXML({
        invoiceId: invoice.id,
        addressId: address.id,
        customerId: user.id,
        customerSecureKey: user.secureKey,
        cartId: cartResult.cart.id,
        carrierId: carrier.id_carrier,
        totalPrice: checkout.productCost,
        totalWeight: basket.reduce(
          (weightSum, { combination, quantity }) =>
            calculateWeight(weightSum, combination, quantity),
          0
        ),
        shippingPrice: carrier.price,
        basket
      });
      result = await fetch(ORDER_CREATE_URL, {
        method: "POST",
        body
      });
      const orderResult = await result.json();
      dispatch(setOrderDone(orderResult.order));
      dispatch(setInStore(false, orderActions.LOADING));
    }
  } catch (error) {
    dispatch(setInStore(false, orderActions.LOADING));
    dispatch(setInStore(error, orderActions.ERROR));
  }
};

const jsonToCartXML = ({
  invoiceId,
  addressId,
  customerId,
  carrierId,
  customerSecureKey,
  basket
}) => `
<prestashop>
    <cart>
        <id_address_delivery>${addressId}</id_address_delivery>
        <id_address_invoice>${invoiceId}</id_address_invoice>
        <id_currency>3</id_currency>
        <id_customer>${customerId}</id_customer>
        <id_guest>0</id_guest>
        <id_lang>1</id_lang>
        <id_shop_group>1</id_shop_group>
        <id_shop>1</id_shop>
        <id_carrier>${carrierId}</id_carrier>
        <recyclable>0</recyclable>
        <gift>0</gift>
        <gift_message/>
        <mobile_theme>0</mobile_theme>
        <delivery_option/>
        <secure_key>${customerSecureKey}</secure_key>
        <allow_seperated_package>0</allow_seperated_package>
        <associations>
            <cart_rows>${getCartRows(basket, addressId)}</cart_rows>
        </associations>
    </cart>
</prestashop>`;

const getCartRows = (basket, addressId) =>
  basket
    .map(
      product => `
    <cart_row>
      <id_product>${product.id}</id_product>
      <id_product_attribute>${product.combination.id}</id_product_attribute>
      <id_address_delivery>${addressId}</id_address_delivery>
      <quantity>${product.quantity}</quantity>
    </cart_row>
    `
    )
    .toString()
    .replace(/,/g, "");

const jsonToOrderXML = ({
  invoiceId,
  addressId,
  customerId,
  carrierId,
  cartId,
  totalPrice,
  totalWeight,
  shippingPrice,
  basket,
  customerSecureKey
}) => `
<prestashop>
  <order>
    <id />
    <id_address_delivery>${addressId}</id_address_delivery>
    <id_address_invoice>${invoiceId}</id_address_invoice>
    <id_cart>${cartId}</id_cart>
    <id_currency>3</id_currency>
    <id_lang>1</id_lang>
    <id_customer>${customerId}</id_customer>
    <id_carrier>${carrierId}</id_carrier>
    <module>worldpay</module>
    <id_shop_group>1</id_shop_group>
    <id_shop>1</id_shop>
    <secure_key>${customerSecureKey}</secure_key>
    <payment>Stripe</payment>
    <total_paid>${parseFloat(totalPrice) +
      parseFloat(shippingPrice)}</total_paid>
    <total_paid_real>${parseFloat(totalPrice) +
      parseFloat(shippingPrice)}</total_paid_real>
    <total_products>${totalPrice}</total_products>
    <total_products_wt>${totalWeight}</total_products_wt>
    <conversion_rate>1</conversion_rate>
    <associations>
      <order_rows>${getCartRows(basket, addressId)}</order_rows>
    </associations>
  </order>
</prestashop>`;
