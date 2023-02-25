import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { PaypalButtonProps } from "@/types/components";

/**
sb-myogs25073529@personal.example.com
iH6&cqmG

Card Type: Visa
Card Number: 4032036101772299
Expiration Date: 10/2026
CVV: 188 
:nkJojoDance:
 */

export default function PaypalButton(props: PaypalButtonProps) {
  const { amountToPay, serviceName } = props;

  const [succeeded, setSucceeded] = useState(false);
  const [orderID, setOrderID] = useState("");
  const [billingDetails, setBillingDetails] = useState("");
  const [paypalErrorMessage, setPaypalErrorMessage] = useState("");

  // creates a paypal order
  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: amountToPay,
            },
          },
          {
            currency_code: "USD",
          },
        ],

        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID: string) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // handles when a payment is confirmed by paypal
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      const { payer } = details;
      setBillingDetails(payer);
      setSucceeded(true);
    });
  };

  // handles when a payment is declined
  const onError = (err: Record<string, unknown>) => {
    setPaypalErrorMessage("Something went wrong with your payment");
    console.error(err);
  };

  if (succeeded) {
    // send them to their new home
    console.log("PAYMETN SUCCESFULL");
  }

  if (paypalErrorMessage) {
    // refresh the page or send them to home
    console.error("Something went wrong with your order");
  }

  return (
    <div className="w-10">
      <PayPalButtons
        style={{
          color: "white",
          shape: "pill",
          label: "subscribe",
          tagline: false,
          layout: "horizontal",
        }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </div>
  );
}
