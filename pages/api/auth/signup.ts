import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      console.log("Connecting to database...");
      await dbConnect();
      console.log("Connected to database successfully");

      const { name, email, password, role } = req.body;
      console.log("Received data:", { name, email, role }); // Don't log password for security reasons

      console.log("Creating user...");
      const user = await User.create({ name, email, password, role });
      console.log("User created successfully:", user);

      res
        .status(201)
        .json({ message: "Kullanıcı başarıyla oluşturuldu", user });
    } catch (error) {
      console.error("Error in signup handler:", error);
      if (error instanceof mongoose.Error.ValidationError) {
        res
          .status(400)
          .json({ message: "Doğrulama hatası", errors: error.errors });
      } else if ((error as any).code === 11000) {
        res
          .status(400)
          .json({ message: "Bu e-posta adresi zaten kullanılıyor" });
      } else {
        res
          .status(500)
          .json({ message: "Sunucu hatası", error: (error as any).message });
      }
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
