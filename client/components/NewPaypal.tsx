import axios from "axios";
import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CLIENT_ID =
  "AQndibadVKrY_Jb_q8qD3Zp0FHRRFiZYUkA3MoDOOpFIx-oFcKGrUZ5AYrY58zDcMxdFKmtc_KYxzycJ";

type PayPalButtonProps = {
  amountToPay: number;
};

export const PayPalButton = ({ amountToPay }: PayPalButtonProps) => {
  const [orderId, setOrderId] = useState("");

  const createOrder = async (data: any, actions: any) => {
    // Make an API call to your server to create an order
    const { data: order } = await axios.post("/api/create-order", {
      amount: {
        value: amountToPay,
        currency_code: "USD",
      },
    });
    setOrderId(order.id);

    return order.id;
  };

  const onApprove = async (data: any, actions: any) => {
    // Make an API call to your server to capture the payment
    const { data: result } = await axios.post("/api/capture-payment", {
      orderId,
      transactionId: data.orderID,
    });

    console.log(result);
  };

  const onCancel = (data: any, actins: any) => {
    console.log("Payment cancelled");
  };

  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onCancel={onCancel}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
