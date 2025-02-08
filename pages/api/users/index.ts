import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const users = await User.find({}).select("-password"); // password hariç tüm alanları getir
      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Kullanıcılar getirilirken bir hata oluştu", error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
