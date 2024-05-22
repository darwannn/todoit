import { useGetMe } from "../../services/userService";

import PersonalInfo from "./components/PersonalInfo";
import Email from "./components/Email";
import Username from "./components/Username";
import Password from "./components/Password";
import SettingsSkeleton from "../../components/Skeleton/SettingsSkeleton";

const Settings = () => {
  const { data: user, isLoading } = useGetMe();
  const userData = user && user.data.user;

  return (
    <div className="w-full my-5 mx-5 ">
      <h1 className="font-bold text-2xl my-2">Account Settings</h1>
      <hr />
      <div className="flex flex-col items-end w-full gap-5 my-5 ">
        {!isLoading ? (
          <>
            <PersonalInfo user={userData} />
            <Username user={userData} />
            <Email user={userData} />
            <Password user={userData} />
          </>
        ) : (
          <>
            <SettingsSkeleton />
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
