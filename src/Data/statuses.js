const red = "#FFDDDD";
const green = "#DDFFAA";
const blue = "#DDEEFF";

export default {
  "1": { name: "Awaiting cheque payment", color: blue },
  "2": { name: "Payment Accepted", color: green },
  "3": { name: "Order Pick in Progress", color: blue },
  "4": { name: "Order Shipped", color: green },
  "5": { name: "Order Delivered", color: green },
  "6": { name: "Order Canceled", color: red },
  "7": { name: "Refund", color: blue },
  "8": { name: "Payment Error", color: red },
  "9": { name: "Order in backorder", color: blue },
  "10": { name: "Awaiting bank wire payment", color: blue },
  "11": { name: "Awaiting PayPal payment", color: blue },
  "12": { name: "Stripe Payment, Pending", color: blue },
  "14": { name: "Payment remotely accepted", color: blue },
  "15": {
    name: "Authorization accepted from PayPal",
    color: blue
  },
  "16": { name: "Order Collected", color: green },
  "17": { name: "Order On Hold", color: red },
  "18": { name: "Awaiting Payment", color: blue },
  "24": { name: "To be shipped", color: blue },
  "27": { name: "Order Ready To Collect" },
  "28": { name: "On Hold - Please Contact Us", color: red },
  "29": { name: "Awaiting WorldPay payment", color: blue },
  "30": { name: "Order On backorder", color: blue },
  "31": { name: "Waiting cod validation", color: blue },
  "35": { name: "Awaiting for Braintree payment", color: blue },
  "36": { name: "Payment Pending", color: blue },
  "37": { name: "Stripe Partial Refund", color: red },
  "39": { name: "Order Complete", color: green }
};
