import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";

type PaypayProps = {
  cost: number;
};

export function Paypal({ cost }: PaypayProps) {
  const [price, setPrice] = useState<number>();

  useEffect(() => {
    setPrice(cost);
  }, []);

  console.log(cost);
  return (
    <div>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AQndibadVKrY_Jb_q8qD3Zp0FHRRFiZYUkA3MoDOOpFIx-oFcKGrUZ5AYrY58zDcMxdFKmtc_KYxzycJ",
        }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            try {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: price,
                    },
                  },
                ],
              });
            } catch (error) {
              console.log(error);
            }
          }}
          onCancel={(data) => console.log("compra cancelada")}
          onApprove={(data, actions) => {
            actions.order?.capture().then((details) => {
              const { email_address, payer_id } = details.payer;
              const { status, id } = details;
              const { value: monto, currency_code: moneda } =
                details.purchase_units[0].amount;
              const { name } = details.purchase_units[0].shipping;
              const { id: transaccionId } = details;

              console.log(details);
            });
          }}
          style={{ layout: "vertical", color: "silver" }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
