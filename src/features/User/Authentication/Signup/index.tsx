import { FormEvent, useState } from "react";
import { ValidatePassword } from "@/utils/Auth/ValidatePassword";
import { CheckPasswordMatch } from "@/utils/Auth/CheckPasswordMatch";
import { ValidateEmail } from "@/utils/Auth/ValidateEmail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { doSignup } from "./doSignup";
import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.css";

export const Signup = () => {
  // 入力を管理するstate
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // 入力欄に一回でもフォーカスが当たったかどうかを管理するstate
  const [touched, setTouched] = useState({
    username: false,
    firstName: false,
    lastName: false,
    age: false,
    email: false,
    password: false,
    passwordConfirmation: false,
  });
  // ユーザー登録完了モーダルの表示を管理するstate
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  // 入力欄の変更を管理する関数
  const handleUsernameChange = (username: string): void => {
    setUsername(username);
  };

  // 入力欄の変更を管理する関数
  const handleFirstNameChange = (firstName: string): void => {
    setFirstName(firstName);
  };

  // 入力欄の変更を管理する関数
  const handleLastNameChange = (lastName: string): void => {
    setLastName(lastName);
  };

  // 入力欄の変更を管理する関数
  const handleAgeChange = (age: number): void => {
    setAge(age);
  };

  // 入力欄の変更を管理する関数
  const handleEmailChange = (email: string): void => {
    setEmail(email);
  };

  // 入力欄の変更を管理する関数
  const handlePasswordChange = (password: string): void => {
    setPassword(password);
  };

  // 入力欄の変更を管理する関数
  const handlePasswordConfirmation = (passwordConfirmation: string): void => {
    setPasswordConfirmation(passwordConfirmation);
  };

  // パスワード表示・非表示を管理する関数
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  // フォーカスが外れた時にフォームのバリデーションを行う関数
  const handleBlur = (field: string): void => {
    setTouched({ ...touched, [field]: true });
  };

  // ユーザー登録完了モーダルを表示する関数
  const handleSetOpenModal = () => {
    setModalIsOpen(true);
  };

  // ユーザー登録を行う関数
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    doSignup(email, password)
      .then(async (uid) => {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid, username, firstName, lastName, age, email }),
        });
        if (res.status === 200) {
          handleSetOpenModal();
        } else {
          throw new Error("ユーザー登録に失敗しました。時間をあけ、再度お試しください。");
        }
      })
      .catch((e: Error) => {
        alert(e.message);
      });
  };

  return (
    <>
      <Head>
        <title>ユーザー登録</title>
      </Head>
      <form method={"post"} onSubmit={handleSubmit}>
        <label>
          ユーザー名
          <input
            type="text"
            value={username}
            onBlur={() => handleBlur("username")}
            onChange={(e) => handleUsernameChange(e.target.value)}
          />
          {touched.username && !username && <span>ユーザー名を入力してください</span>}
        </label>
        <br />
        <label>
          名前
          <input
            type="text"
            value={lastName}
            onBlur={() => handleBlur("lastName")}
            onChange={(e) => handleLastNameChange(e.target.value)}
          />
          <input
            type="text"
            value={firstName}
            onBlur={() => handleBlur("firstName")}
            onChange={(e) => handleFirstNameChange(e.target.value)}
          />
          {touched.firstName && !firstName && touched.lastName && !lastName && <span>名前を入力してください</span>}
        </label>
        <br />
        <label>
          年齢
          <input
            type="number"
            value={age}
            onBlur={() => handleBlur("age")}
            onChange={(e) => handleAgeChange(Number(e.target.value))}
          />
          {touched.age && !age && <span>年齢を入力してください</span>}
        </label>
        <br />
        <label>
          メールアドレス
          <input
            type="email"
            value={email}
            onBlur={() => handleBlur("email")}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          {touched.email && email && !ValidateEmail(email) && <span>メールアドレスの形式が正しくありません</span>}
        </label>
        <br />
        <label>
          パスワード
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onBlur={() => handleBlur("password")}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </button>
          {touched.password && password && !ValidatePassword(password) && (
            <span>パスワードは小文字、大文字、数字を含む8文字以上にする必要があります。</span>
          )}
        </label>
        <br />
        <label>
          パスワード再入力
          <input
            type="password"
            value={passwordConfirmation}
            onBlur={() => handleBlur("passwordConfirmation")}
            onChange={(e) => handlePasswordConfirmation(e.target.value)}
          />
          {touched.passwordConfirmation &&
            passwordConfirmation &&
            !CheckPasswordMatch(password, passwordConfirmation) && <span>パスワードが一致しません</span>}
        </label>
        <br />
        <button
          type="submit"
          disabled={
            !username ||
            !email ||
            !password ||
            !passwordConfirmation ||
            !ValidateEmail(email) ||
            !ValidatePassword(password) ||
            !CheckPasswordMatch(password, passwordConfirmation)
          }
        >
          登録
        </button>
      </form>
      <div>
        <Link href={"/user/auth/login"}>ログインはこちら</Link>
      </div>
      {modalIsOpen && (
        <div className={`${styles["outside-modal"]}`}>
          <div className={`${styles["confirm-modal"]}`}>
            <p>ユーザー登録が完了しました。</p>
            <p>メールアドレス認証をした後、ログインをしてください。</p>
            <Link href={"/user/auth/login"}>ログインはこちら</Link>
          </div>
        </div>
      )}
    </>
  );
};
