import { useState } from "react";

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

export const doAllergyRegistration = async (allergyList: object) => {
  return true;
};
