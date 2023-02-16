import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  auth: boolean;
};

type ApiReq = NextApiRequest;
type ApiRes = NextApiResponse<Data>;

export default async function handler(req: ApiReq, res: ApiRes) {
  res.status(200).json({ name: "John Doe", auth: true });
}
