import { useState } from "react";

const handleSubmit = () => {
  // TODO:登録処理
};

export const AllergySetting = () => {
  const [allergyList, setAllergyList] = useState({
    wheat: false, //1
    soba: false, //2
    soy: false, //3
    sesame: false, //4
    egg: false, //5
    milk: false, //6
    beef: false, //7
    chicken: false, //8
    pork: false, //9
    mackerel: false, //10
    crab: false, //11
    shrimp: false, //12
    abalone: false, //13
    squid: false, //14
    salmonRoe: false, //15
    gelatin: false, //16
    salmon: false, //17
    cashewNuts: false, //18
    almond: false, //19
    walnut: false, //20
    matsutake: false, //21
    peanut: false, //22
    peaches: false, //23
    apple: false, //24
    banana: false, //25
    kiwiFruit: false, //26
    orange: false, //27
    mountainYam: false, //28
  });

  //残骸
  // const [wheat, setWheat ] = useState("");
  // const [soba, setSoba ] = useState("");
  // const [soy, setSoy ] = useState("");
  // const [sesame, setSesame ] = useState("");
  // const [egg, setEgg ] = useState("");
  // const [milk, setMilk ] = useState("");
  // const [beef, setBeef ] = useState("");
  // const [chicken, setChicken ] = useState("");
  // const [pork, setPork ] = useState("");
  // const [mackerel, setMackerel ] = useState("");
  // const [crab, setCrab ] = useState("");
  // const [shrimp, setShrimp ] = useState("");
  // const [abalone, setAbalone ] = useState("");
  // const [squid, setSquid ] = useState("");
  // const [salmonRoe, setSalmonRoe ] = useState("");
  // const [gelatin, setGelatin ] = useState("");
  // const [salmon, setSalmon ] = useState("");
  // const [cashewNuts, setCashewNuts ] = useState("");
  // const [almond, setAlmond] = useState("");
  // const [walnut, setWalnut ] = useState("");
  // const [matsutake, setMatsutake ] = useState("");
  // const [peanut, setPeanut ] = useState("");
  // const [peaches, setPeaches ] = useState("");
  // const [apple, setApple ] = useState("");
  // const [banana, setBanana ] = useState("");
  // const [kiwiFruit, setKiwiFruit ] = useState("");
  // const [orange, setOrange ] = useState("");
  // const [mountainYam, setMountainYam ] = useState("");

  // const checkbox: HTMLInputElement = document.getElementById("allergy") as HTMLInputElement;
  // checkbox.addEventListener("change", (event) => {
  //   const target = event.target as HTMLInputElement;
  //   setAllergyList({ ...allergyList, ["wheat"]: target.checked });
  //   console.log(target.checked); // チェックの状態を表示（true: チェックあり, false: チェックなし）
  // });

  const changeAllergyList = (target: string): void => {
    setAllergyList({ ...allergyList, [target]: !allergyList.wheat });
    console.log(allergyList);
  };

  // const handleBlur = (field: string): void => {
  //   setAllergyList({ ...allergyList, [field]: true });
  // };

  return (
    <>
      <h2>アレルギー設定</h2>
      <form method={"post"} onSubmit={handleSubmit}>
        <h3></h3>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("wheat")}></input>
          小麦
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("soba")}></input>
          そば
        </label>
        <br />
        <button type="submit">決定</button>
      </form>
    </>
  );
};
