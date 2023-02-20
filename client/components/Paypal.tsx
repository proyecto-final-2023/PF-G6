// Libraries
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// Types
// Components/Assets

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function Paypal() {
  return (
    <div>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AQndibadVKrY_Jb_q8qD3Zp0FHRRFiZYUkA3MoDOOpFIx-oFcKGrUZ5AYrY58zDcMxdFKmtc_KYxzycJ",
        }}
      >
        <PayPalButtons
          createOrder={async () => {
            try {
              const res = await axios({
                url: "http://localhost:3000/api/payment",
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              return res.data.id;
            } catch (error) {
              console.log(error);
            }
          }}
          onCancel={(data) => console.log("compra cancelada")}
          onApprove={async (data, actions) => {
            console.log(data);
            actions.order?.capture();
          }}
          style={{ layout: "vertical", color: "blue" }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
