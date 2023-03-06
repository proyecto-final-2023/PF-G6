import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { PaypalButtonProps } from "@/types/components";
import { useRouter } from "next/router";
import axios from "axios";
import { getCookie } from "@/utils/cookieHandler";

/**
sb-myogs25073529@personal.example.com
iH6&cqmG
Card Type: Visa
Card Number: 4032036101772299
Expiration Date: 10/2026
CVV: 188 
:nkJojoDance:
 */
type OnApproveData = {
  status: any;
  update_time: any;
  payer: { payer_id: any };
  purchase_units: { amount: { value: any } }[];
};

export default function PaypalButton(props: PaypalButtonProps) {
  const router = useRouter();
  const { amountToPay, serviceName, idPlans } = props;
  const key = getCookie("token");
  console.log(key);
  //  const key=document.cookie.split(' ')[1].split('=')[1];

  const [succeeded, setSucceeded] = useState(false);
  const [orderID, setOrderID] = useState("");
  const [billingDetails, setBillingDetails] = useState<any>();
  const [paypalErrorMessage, setPaypalErrorMessage] = useState("");

  // creates a paypal order
  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: amountToPay
            }
          }
        ],

        application_context: {
          shipping_preference: "NO_SHIPPING"
        }
      })
      .then((orderID: string) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // handles when a payment is confirmed by paypal
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function (details: OnApproveData) {
      const { status, update_time } = details;
      const { payer_id } = details.payer;
      const { value } = details.purchase_units[0].amount;

      const data = {
        idPlan: idPlans,
        idPago: payer_id,
        cost: Number(value),
        status: status,
        fechaPago: update_time
      };
      //enviamos datos a membership
      try {
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/membership`, data, {
            headers: { "x-access-token": key }
          })
          .then((res) => {
            // aqui te manda
            axios
              .post(`${process.env.NEXT_PUBLIC_API_URL}/user/perfil`, null, {
                headers: { "x-access-token": key }
              })
              .then((data) => {
            
              });
          });
      } catch (error) {
        console.error(error);
      }

      setBillingDetails(data);
      setSucceeded(true);
    });
  };
  const envioData = () => {};
  // handles when a payment is declined
  const onError = (err: Record<string, unknown>) => {
    setPaypalErrorMessage("Something went wrong with your payment");
    console.error(err);
  };

  if (succeeded) {
    // send them to their new home
  }

  if (paypalErrorMessage) {
    // refresh the page or send them to home
    console.error("Something went wrong with your order");
  }

  return (
    <div className=" flex flex-col w-40">
      <PayPalButtons
        style={{
          height: 25,
          color: "white",
          shape: "rect",
          label: "paypal",
          tagline: false,
          layout: "vertical"
        }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </div>
  );
}
