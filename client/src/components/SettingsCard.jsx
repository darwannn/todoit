const SettingsCard = ({ title, children }) => {
  return (
    <div className="w-full lg:w-3/4 bg-gray-50 rounded-lg p-5 ">
      <div className="font-bold text-xl">{title}</div>

      <hr className="mt-4 mb-5 " />

      {children}
    </div>
  );
};

export default SettingsCard;
