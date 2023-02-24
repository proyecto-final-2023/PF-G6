import axios from "axios";
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import {useState, useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from '.././firebase';


export function Paypal({cost}) {
    const [price, setPrice] = useState("");
    const [user, setUser] = useAuthState(auth);
    // const{accessToken }= user

    // console.log(user)

    useEffect(() => {
        setPrice(cost);
    }, []);

    // console.log(cost);
    return (
        <div>
            <PayPalScriptProvider options={
                {"client-id": "AQndibadVKrY_Jb_q8qD3Zp0FHRRFiZYUkA3MoDOOpFIx-oFcKGrUZ5AYrY58zDcMxdFKmtc_KYxzycJ"}
            }>
                <PayPalButtons createOrder={
                        (data, actions) => {
                            try {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: price
                                            }
                                        },
                                    ]
                                });
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                    onCancel={
                        (data) => console.log("compra cancelada")
                    }
                    onApprove={
                        (data, actions) => {
                            actions.order.capture().then((details) => {
                                const {payer_id} = details.payer;
                                const {status, id, update_time} = details;
                                const {value: monto, currency_code: moneda} = details.purchase_units[0].amount;
                                const data = {
                                    id: id,
                                    price: monto,
                                    status: status,
                                    time: update_time,
                                    payerId: payer_id
                                }


                                console.log(data);
                            });
                        }
                    }
                    style={
                        {
                            layout: "vertical",
                            color: "silver"
                        }
                    }/>
            </PayPalScriptProvider>
</div>
    );
}
