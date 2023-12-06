import { useState } from "react";
import { doEmployeeLogin } from "./doEmployeeLogin";
import styles from "./index.module.css";
import router from "next/router";
import { ValidateEmail } from "@/utils/Auth/ValidateEmail";
import { ValidatePassword } from "@/utils/Auth/ValidatePassword";

export const OrderEmployeeLogin = () => {
  // 入力を管理するstate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  // 入力のバリデーションを管理するstate
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // 入力欄からフォーカスが外れたときにバリデーションを行う関数
  const handleBlur = (field: "email" | "password") => {
    setTouched({ ...touched, [field]: true });
  };

  // ログインボタンを押したときの処理
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loginSuccess = await doEmployeeLogin(email, password);
      if (loginSuccess) {
        await router.push("/order/employee/top");
      } else {
        setLoginError("ログインに失敗しました");
      }
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError("ログインに失敗しました。");
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <h1>店舗ログイン</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {loginError && <p>{loginError}</p>}
          <div className={styles.formItem}>
            <label>従業員メールアドレス</label>
            <input
              type="text"
              id="email"
              onBlur={() => handleBlur("email")}
              onChange={(e) => setEmail(e.target.value)}
            />
            {touched.email && !email && <p>メールアドレスを入力してください</p>}
          </div>
          <div className={styles.formItem}>
            <label>パスワード</label>
            <input
              type="password"
              id="password"
              onBlur={() => handleBlur("password")}
              onChange={(e) => setPassword(e.target.value)}
            />
            {touched.password && !password && <p>パスワードを入力してください</p>}
          </div>
          <div className={styles.formItem}>
            <button
              type="submit"
              disabled={!email || !password || !ValidateEmail(email) || !ValidatePassword(password)}
            >
              ログイン
            </button>
          </div>
        </form>
      </div>
    </>
  );
};