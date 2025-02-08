import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== "admin") {
    return res.status(403).json({ message: "Yetkisiz erişim" });
  }

  const { id } = req.query;
  await dbConnect();

  switch (req.method) {
    case "PUT":
      try {
        const { name, email, role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
          id,
          { name, email, role },
          { new: true, runValidators: true }
        ).select("-password");
        if (!updatedUser) {
          return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(400).json({ message: "Kullanıcı güncellenemedi", error });
      }
      break;

    case "DELETE":
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }
        res.status(200).json({ message: "Kullanıcı başarıyla silindi" });
      } catch (error) {
        res.status(400).json({ message: "Kullanıcı silinemedi", error });
      }
      break;

    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
