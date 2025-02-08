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

  const { id } = req.query;

  switch (req.method) {
    case "PUT":
      try {
        const { paidAmount } = req.body;
        const distribution = await FarmlandExpenseDistribution.findById(id);

        if (!distribution) {
          return res.status(404).json({ message: "Distribution not found" });
        }

        distribution.paidCost += paidAmount;
        distribution.paymentDetails.push({
          amount: paidAmount,
          date: new Date(),
        });

        if (distribution.paidCost >= distribution.allocatedCost) {
          distribution.status = "paid";
        } else if (distribution.paidCost > 0) {
          distribution.status = "partialPaid";
        }

        await distribution.save();

        res.status(200).json(distribution);
      } catch (error) {
        res.status(400).json({ message: "Error updating distribution" });
      }
      break;

    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
