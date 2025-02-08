import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import Season from "@/models/Season";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

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
        const { year, active } = req.body;

        if (!year || typeof year !== "number") {
          return res
            .status(400)
            .json({ message: "Year is required and must be a number" });
        }

        const updatedSeason = await Season.findByIdAndUpdate(
          id,
          { year, active },
          { new: true, runValidators: true }
        );

        if (!updatedSeason) {
          return res.status(404).json({ message: "Season not found" });
        }

        res.status(200).json(updatedSeason);
      } catch (error) {
        console.error("Season update error:", error);
        res
          .status(400)
          .json({
            message: "Error updating season",
            error: (error as Error).message,
          });
      }
      break;

    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
