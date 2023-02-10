// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../db/models/User";

type Data = {
  name: string;
  users: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const users = await User.findAll();

  res.status(200).json({ name: "John Doe", users });
}
