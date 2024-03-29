import Link from "next/link";
import styles from "./index.module.css";

export const UserHeader = () => {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles["store-name"]}>
          <Link href={`/user/top`} className={styles["store-link"]}>
            Personalized<span className={styles["name-menu"]}>Menu</span>
          </Link>
        </h1>
        <div className={styles.link}>
          <Link href={`/user/account`} className={styles["link-font"]}>
            アカウント
          </Link>
          <Link href={`/user/settings/allergy`} className={styles["link-font"]}>
            アレルギー
          </Link>
          <Link href={`/user/settings/like`} className={styles["link-font"]}>
            好きな食べ物
          </Link>
          <Link href={`/user/settings/dislike`} className={styles["link-font"]}>
            嫌いな食べ物
          </Link>
          {/* <div className={styles.link}>
            <Link href={`/user/order-history`}>過去の注文履歴</Link>
          </div> */}
          {/* <div className={styles.link}>
            <Link href={`/user/qr`}>QRコード表示</Link>
          </div> */}
        </div>
      </header>
    </>
  );
};
