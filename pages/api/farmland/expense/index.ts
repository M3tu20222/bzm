import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import FarmlandExpense from "@/models/FarmlandExpense";
import FarmlandOwnership from "@/models/FarmlandOwnership";
import FarmlandExpenseDistribution from "@/models/FarmlandExpenseDistribution";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

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
        const expenses = await FarmlandExpense.find({}).populate("farmland");
        res.status(200).json(expenses);
      } catch (error) {
        res.status(400).json({ message: "Error fetching expenses" });
      }
      break;

    case "POST":
      try {
        const expense = await FarmlandExpense.create(req.body);

        // Tarla sahiplerini ve paylarını bul
        const ownerships = await FarmlandOwnership.find({
          farmland: expense.farmland,
        });

        // Her sahip için masraf dağılımını oluştur
        for (const ownership of ownerships) {
          const allocatedCost =
            expense.totalCost * (ownership.sharePercent / 100);
          await FarmlandExpenseDistribution.create({
            expense: expense._id,
            user: ownership.user,
            allocatedCost,
            creditor: session.user.id, // Masrafı ekleyen kişi varsayılan olarak creditor olsun
            status: "pending",
          });
        }

        res.status(201).json(expense);
      } catch (error) {
        res.status(400).json({ message: "Error creating expense" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
