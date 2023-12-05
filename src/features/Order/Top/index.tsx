import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faChild } from "@fortawesome/free-solid-svg-icons";
import router from "next/router";
import styles from "./index.module.css";
import { useState } from "react";

const EmployeeButton = () => {
  return (
    <button
      className={styles.employeeButton}
      onClick={() => {
        void router.push("/employee").then().catch();
      }}
    >
      従業員画面
    </button>
  );
};

export const OrderTop = () => {
  const [numberOfPeople, setNumberOfPeople] = useState({
    adult: 0,
    child: 0,
  });

  const handleChangeNumberOfPeople = (key: "adult" | "child", method: "add" | "sub") => {
    setNumberOfPeople((prev) => ({
      ...prev,
      [key]: method === "add" ? prev[key] + 1 : prev[key] - 1,
    }));
  };

  return (
    <div className={styles.container}>
      <EmployeeButton />
      <h1 className={styles.title}>人数選択</h1>
      <div className={styles.selectionArea}>
        <div className={styles.personSelection}>
          <FontAwesomeIcon icon={faPerson} className={styles.icon} />
          <button className={styles.changeButton} onClick={() => handleChangeNumberOfPeople("adult", "sub")}>
            -
          </button>
          <span className={styles.numberDisplay}>{numberOfPeople.adult}</span>
          <button className={styles.changeButton} onClick={() => handleChangeNumberOfPeople("adult", "add")}>
            +
          </button>
        </div>
        <div className={styles.personSelection}>
          <FontAwesomeIcon icon={faChild} className={styles.icon} />
          <button className={styles.changeButton} onClick={() => handleChangeNumberOfPeople("child", "sub")}>
            -
          </button>
          <span className={styles.numberDisplay}>{numberOfPeople.child}</span>
          <button className={styles.changeButton} onClick={() => handleChangeNumberOfPeople("child", "add")}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};
