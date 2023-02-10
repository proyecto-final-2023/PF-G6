// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../db/models/User";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  User.sync({ alter: true }).then(() => {
    // Table created
    return User.create({
      username: "john",
      email: "john@example.com",
      password: "1234",
    });
  });

  res.status(200).json({ name: "Done" });
}
