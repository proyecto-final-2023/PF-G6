import type { NextApiRequest, NextApiResponse } from "next";
const paypal = require("@paypal/checkout-server-sdk");

type ApiReq = NextApiRequest;
type ApiRes = NextApiResponse;

// Creating an environment
let clientId =
  "AQndibadVKrY_Jb_q8qD3Zp0FHRRFiZYUkA3MoDOOpFIx-oFcKGrUZ5AYrY58zDcMxdFKmtc_KYxzycJ";
let clientSecret =
  "EIn1eRDa189NlC9EQ196AHthjUh7BLQ0X_BUUhnSaheKlzfEEHyOorWNvTEGsHhn2Nh5lr9GCBhRinBN";

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export default async function handler(req: ApiReq, res: ApiRes) {
  if (req.method === "POST") {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "100.00",
          },
        },
      ],
    });
    const response = await client.execute(request);

    return res.json({ id: response.result.id });
  }
}
