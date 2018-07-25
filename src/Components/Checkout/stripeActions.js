import { fetcher, openFetcher } from "../util";
import { STRIPE_URL, ORDER_STATUS_URL } from "../../constants";

export const stripeActions = {
  ERROR: "STRIPE_ERROR",
  LOADING: "STRIPE_LOADING",
  DONE: "STRIPE_DONE"
};

export const updateOrderActions = {
  ERROR: "UPDATE_ORDER_ERROR",
  LOADING: "UPDATE_ORDER_LOADING",
  DONE: "UPDATE_ORDER_DONE"
};

export default ({ token, currency, amount, description }) => dispatch =>
  fetcher(
    stripeActions,
    `${STRIPE_URL}?token=${token}&currency=${currency}&amount=${amount}&description=${description}`,
    dispatch
  );

export const updateOrder = () => (dispatch, getState) => {
  const {
    checkout: {
      order: { order }
    }
  } = getState();
  openFetcher(
    async () => {
      const result = await fetch(ORDER_STATUS_URL, {
        method: "POST",
        headers: { "Content-Type": "text/xml" },
        body: jsonToOrderUpdateXML(order)
      });
      return result.json();
    },
    updateOrderActions,
    dispatch,
    "order_history"
  );
};

const jsonToOrderUpdateXML = ({ id }) => `
<prestashop>
<order_history>
  <id_employee>0</id_employee>
  <id_order_state>2</id_order_state>
  <id_order>${id}</id_order>
</order_history>
</prestashop>`;
