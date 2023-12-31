import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { firebaseApp } from "@/utils/Firebase/firebaseConfig";

// ユーザーアカウントの削除を行う関数
export const doWithdrawal = async (password: string): Promise<boolean> => {
  try {
    const auth = getAuth(firebaseApp);

    // 現在ログインしているユーザー情報を取得
    const user = auth.currentUser;

    // もしユーザーが存在しないか、メールアドレスが存在しない場合はエラーをスロー
    if (!user || !user.email) {
      throw new Error("ユーザーが存在しません。");
    }

    // ユーザーのメールアドレスとパスワード情報から認証資格情報を取得
    const credential = EmailAuthProvider.credential(user.email, password);

    // ユーザーを再認証し、認証情報が正しいか確認
    await reauthenticateWithCredential(user, credential);

    // ユーザーアカウントを削除
    await deleteUser(user);

    // 削除成功を示すtrueを返す
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
