import { AllergySetting } from "@/features/User/Settings/Allergy";
import { User, UserAllergy } from "@/features/User/Settings/Allergy/type";
import { getAllergies } from "@/features/User/Settings/Allergy/getAllergies";
import { getUser } from "@/features/User/Settings/Allergy/getUser";
const AllergySettingPage = ({ userAllergies }: { userAllergies: UserAllergy[] }, { user }: { user: User[] }) => {
  return <AllergySetting allergies={userAllergies} />;
};

//画面を見る用（現状、エラーが出てしまうので）
// const AllergySettingPage = () => {
//   return <AllergySetting />;
// };

export const getServerSideProps = async () => {
  //ユーザーのアレルギーを取得
  const userAllergies = await fetch(`/api/uer/${user.uid}`).then(());
  const user = await getUser();
  return {
    props: {
      userAllergies,
      user,
    },
  };
};

export default AllergySettingPage;
