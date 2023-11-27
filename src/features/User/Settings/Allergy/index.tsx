import { useState } from "react";
import { doAllergyRegistration } from "./doAllergyRegistration";



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

  const handleSubmit = () => {
    // TODO:登録処理
    void doAllergyRegistration(allergyList);
  };

  const changeAllergyList = (target: string): void => {
    switch (target) {
      case "wheat":
        setAllergyList({ ...allergyList, [target]: !allergyList.wheat });
        break;
      case "soba":
        setAllergyList({ ...allergyList, [target]: !allergyList.soba });
        break;
      case "soy":
        setAllergyList({ ...allergyList, [target]: !allergyList.soy });
        break;
      case "sesame":
        setAllergyList({ ...allergyList, [target]: !allergyList.sesame });
        break;
      case "egg":
        setAllergyList({ ...allergyList, [target]: !allergyList.egg });
        break;
      case "milk":
        setAllergyList({ ...allergyList, [target]: !allergyList.milk });
        break;
      case "beef":
        setAllergyList({ ...allergyList, [target]: !allergyList.beef });
        break;
      case "chicken":
        setAllergyList({ ...allergyList, [target]: !allergyList.chicken });
        break;
      case "pork":
        setAllergyList({ ...allergyList, [target]: !allergyList.pork });
        break;
      case "mackerel":
        setAllergyList({ ...allergyList, [target]: !allergyList.mackerel });
        break;
      case "crab":
        setAllergyList({ ...allergyList, [target]: !allergyList.crab });
        break;
      case "shrimp":
        setAllergyList({ ...allergyList, [target]: !allergyList.shrimp });
        break;
      case "abalone":
        setAllergyList({ ...allergyList, [target]: !allergyList.abalone });
        break;
      case "squid":
        setAllergyList({ ...allergyList, [target]: !allergyList.squid });
        break;
      case "salmonRoe":
        setAllergyList({ ...allergyList, [target]: !allergyList.salmonRoe });
        break;
      case "gelatin":
        setAllergyList({ ...allergyList, [target]: !allergyList.gelatin });
        break;
      case "salmon":
        setAllergyList({ ...allergyList, [target]: !allergyList.salmon });
        break;
      case "cashewNuts":
        setAllergyList({ ...allergyList, [target]: !allergyList.cashewNuts });
        break;
      case "almond":
        setAllergyList({ ...allergyList, [target]: !allergyList.almond });
        break;
      case "walnut":
        setAllergyList({ ...allergyList, [target]: !allergyList.walnut });
        break;
      case "matsutake":
        setAllergyList({ ...allergyList, [target]: !allergyList.matsutake });
        break;
      case "peanut":
        setAllergyList({ ...allergyList, [target]: !allergyList.peanut });
        break;
      case "peaches":
        setAllergyList({ ...allergyList, [target]: !allergyList.peaches });
        break;
      case "apple":
        setAllergyList({ ...allergyList, [target]: !allergyList.apple });
        break;
      case "banana":
        setAllergyList({ ...allergyList, [target]: !allergyList.banana });
        break;
      case "kiwiFruit":
        setAllergyList({ ...allergyList, [target]: !allergyList.kiwiFruit });
        break;
      case "orange":
        setAllergyList({ ...allergyList, [target]: !allergyList.orange });
        break;
      case "mountainYam":
        setAllergyList({ ...allergyList, [target]: !allergyList.mountainYam });
        break;
    }
  };

  return (
    <>
      <h2>アレルギー設定</h2>
      <form method={"post"} onSubmit={handleSubmit}>
        <h3>穀物類・ごま</h3>
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("wheat")} />
          小麦
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("soba")} />
          そば
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("soy")} />
          大豆
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("sesame")} />
          ごま
        </label>
        <br />
        <h3>肉・卵・魚介類</h3>
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("egg")} />卵
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("milk")} />乳
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("beef")} />
          牛肉
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("chicken")} />
          鶏肉
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("pork")} />
          豚肉
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("mackerel")} />
          さば
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("crab")} />
          かに
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("shrimp")} />
          エビ
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("abalone")} />
          アワビ
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("squid")} />
          いか
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("salmonRoe")} />
          いくら
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("gelatin")} />
          ゼラチン
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("salmon")} />
          サーモン
        </label>
        <br />
        <h3>ナッツ類・キノコ類</h3>
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("cashewNuts")} />
          カシューナッツ
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("almond")} />
          アーモンド
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("walnut")} />
          クルミ
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("matsutake")} />
          まつたけ
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("peanut")} />
          ピーナッツ
        </label>
        <br />
        <h3>果物類・その他</h3>
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("peaches")} />
          もも
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("apple")} />
          りんご
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("banana")} />
          バナナ
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("kiwiFruit")} />
          キウイ
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("orange")} />
          オレンジ
        </label>
        <br />
        <label>
          <input type="checkbox" id="allergy" onClick={() => changeAllergyList("mountainYam")} />
          やまいも
        </label>
        <br />
        <button type="submit">登録</button>
      </form>
    </>
  );
};
