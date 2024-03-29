import { useState } from "react";
import { doPasswordReset } from "./doPasswordReset";
import { ValidateEmail } from "@/utils/Auth/ValidateEmail";
import styles from "./index.module.css";
import Link from "next/link";
import Head from "next/head";

export const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [passwordResetError, setPasswordResetError] = useState("");
  const [touched, setTouched] = useState({
    email: false,
  });

  // ユーザー登録完了モーダルの表示を管理するstate
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  // ユーザー登録完了モーダルを表示する関数
  const handleSetOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loginSuccess = await doPasswordReset(email);
      if (loginSuccess) {
        handleSetOpenModal();
      } else {
        setPasswordResetError("指定されたメールアドレスは登録されていません。");
      }
    } catch (err) {
      console.error(err);
      setPasswordResetError("メール送信中にエラーが発生しました。時間をあけ、再度実行してください。");
    }
  };
  return (
    <>
      <Head>
        <title>パスワードリセット | PersonalizedMenu</title>
      </Head>
      <div className={styles.base}>
        <div>
          <h1>パスワードリセット</h1>
        </div>
        {passwordResetError && <div>{passwordResetError}</div>}
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            <div className={styles["label-text"]}>登録されているメールアドレスを入力してください</div>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onBlur={() => setTouched({ ...touched, email: true })}
              onChange={(e) => setEmail(e.target.value)}
            />
            {touched.email && !email && <span className={styles.span}>メールアドレスを入力してください</span>}
          </label>
          <br />
          <button className={styles.button} type="submit" disabled={!email || !touched.email || !ValidateEmail(email)}>
            メールを送信
          </button>
        </form>
      </div>
      {modalIsOpen && (
        <div className={`${styles["outside-modal"]}`}>
          <div className={`${styles["confirm-modal"]}`}>
            <p>メールを送信しました。</p>
            <p>新しいパスワードを設定した後、ログインをしてください。</p>
            <Link href={"/user/auth/login"}>ログインはこちら</Link>
          </div>
        </div>
      )}
    </>
  );
};
