import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white">
      <div className="px-5 min-h-screen flex flex-col items-center justify-center ">
        <div className="absolute sm:text-[23em] text-[50vw] text-gray-100 ">
          404
        </div>
        <div className="text-lg text-gray-700 z-10  text-center leading-5">
          The content you are looking for does not exist.
        </div>
        <button
          className="btn-primary w-full bg-transparent hover:bg-transparent hover:border-gray-700 border-gray-400  sm:w-44 z-10 mt-2"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
