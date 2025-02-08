import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import FarmlandExpenseDistribution from "@/models/FarmlandExpenseDistribution";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const distributions = await FarmlandExpenseDistribution.find({})
          .populate("expense")
          .populate("user")
          .populate("creditor");
        res.status(200).json(distributions);
      } catch (error) {
        res
          .status(400)
          .json({ message: "Error fetching expense distributions" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
