import { useRouter } from "next/router";
import { useState } from "react";
import { doLogin } from "./doLogin";
import Link from "next/link";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loginSuccess = await doLogin(email, password);
      if (loginSuccess) {
        await router.push("/user/top");
      } else {
        setLoginError("メールアドレスまたはパスワードが間違っています。");
      }
    } catch (err) {
      if (err instanceof Error) {
        setLoginError(err.message);
      } else {
        console.error(err);
        setLoginError("ログイン中にエラーが発生しました。時間をあけ、再度実行してください。");
      }
    }
  };

  return (
    <>
      <div>
        {loginError && <div>{loginError}</div>}
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit}>
          <label>
            <div>メールアドレス</div>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onBlur={() => setTouched({ ...touched, email: true })}
              onChange={(e) => setEmail(e.target.value)}
            />
            {touched.email && !email && <span>メールアドレスを入力してください</span>}
          </label>
          <br />
          <label>
            <div>パスワード</div>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onBlur={() => setTouched({ ...touched, password: true })}
              onChange={(e) => setPassword(e.target.value)}
            />
            {touched.password && !password && <span>パスワードを入力してください</span>}
            <Link href={"/user/auth/password/reset"}>パスワードを忘れた場合</Link>
          </label>

          <button type="submit" disabled={!email || !password}>
            ログイン
          </button>
        </form>
      </div>
    </>
  );
};
