import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import Farmland from "@/models/Farmland";
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
        const farmlands = await Farmland.find({}).populate(
          "currentSeason owners.user"
        );
        res.status(200).json(farmlands);
      } catch (error) {
        res.status(400).json({ message: "Error fetching farmlands" });
      }
      break;

    case "POST":
      try {
        const farmland = await Farmland.create(req.body);
        res.status(201).json(farmland);
      } catch (error) {
        res.status(400).json({ message: "Error creating farmland" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
