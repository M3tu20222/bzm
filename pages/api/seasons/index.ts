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

  switch (req.method) {
    case "GET":
      try {
        const seasons = await Season.find({}).sort({ year: -1 }); // Sort by year descending
        res.status(200).json(seasons);
      } catch (error) {
        res.status(400).json({ message: "Error fetching seasons" });
      }
      break;

    case "POST":
      try {
        const { year } = req.body;

        if (!year || typeof year !== "number") {
          return res
            .status(400)
            .json({ message: "Year is required and must be a number" });
        }

        // Check if a season already exists for this year
        const existingSeason = await Season.findOne({ year });
        if (existingSeason) {
          return res
            .status(400)
            .json({ message: `${year}-${year + 1} sezonu zaten mevcut` });
        }

        const season = await Season.create({ year });
        res.status(201).json(season);
      } catch (error) {
        console.error("Season creation error:", error);
        res
          .status(400)
          .json({
            message: "Error creating season",
            error: (error as Error).message,
          });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
