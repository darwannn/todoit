import { Link } from "react-router-dom";

const AuthenticationCard = ({ title, children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 ">
      <div className="flex bg-gray-50 w-[1000px] rounded-xl shadow-lg m-5 min-h-[600px]">
        <div className="hidden md:block w-1/2 rounded-xl m-3 relative overflow-hidden">
          <Link
            to={"/"}
            className="text-white z-20 absolute -rotate-90 -right-64 top-1/2 transform -translate-y-1/2 text-[10.5em] font-bold"
          >
            TODOIT
          </Link>
          <div className="z-10 w-full h-full absolute top-0 left-0 bg-black"></div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-3 px-5 sm:px-20 py-20 justify-center m-3">
          <h1 className="text-primary font-bold text-4xl">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationCard;
