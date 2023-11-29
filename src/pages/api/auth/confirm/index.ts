import { prisma } from "@/utils/Prisma/PrismaClient";
import { NextApiResponse } from "next";
import { NextApiRequestExtendsUser } from "@/types/api/signup";

const signupHandler = async (req: NextApiRequestExtendsUser, res: NextApiResponse) => {
  const { uid } = req.body;
  if (!uid) {
    return res.status(400).json({ message: "Invalid request" });
  }


   // Firebaseでの削除が完了した後、データベースの更新処理を実行
  try {
  const updatedUser = await prisma.user.update({
    where: {
      userId: user.id, // ユーザーのIDを指定
    },
    data: {
      isDeleted: true,
      deletedAt: new Date(), // 削除した時刻を設定
    },
  });


export default signupHandler;
