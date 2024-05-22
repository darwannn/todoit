import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
const AddTaskButton = ({ url }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="flex items-center gap-2 py-2 px-3 text-gray-500 bg-transparent border border-gray-200 rounded-md cursor-pointer hover:text-gray-700 transition-all hover:bg-gray-50 font-semibold hover:font-bold"
        onClick={() => {
          navigate(`/${url}/create`);
        }}
      >
        <FaPlus size={15} />
        <span className=" flex-1 ">New Task</span>
      </div>
    </>
  );
};

export default AddTaskButton;
