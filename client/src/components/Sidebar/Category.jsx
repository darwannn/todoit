import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  useCreateCategory,
  useGetCategory,
} from "../../services/categoryService";

import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import SidebarSkeleton from "../Skeleton/SidebarSkeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Category = () => {
  const navigate = useNavigate();

  const { data: category } = useGetCategory();
  const categoryData = category?.data?.category;
  // console.log(categoryData);
  const { mutate: createMutation, isPending: createIsPending } =
    useCreateCategory();

  useEffect(() => {
    if (categoryData) {
      // navigate(`/error`);
    }
  }, [categoryData, navigate]);
  const onSubmitCategory = () => {
    createMutation(null, {
      onSuccess: (response) => {
        console.log(response);
        navigate(`/list/${response.data.category.id}`);
      },
      onError: (response) => {
        console.log(response);
      },
    });
  };

  return (
    <>
      <ul className="space-y-1">
        <li className="font-bold text-gray-700 text-sm">LIST</li>
        {categoryData ? (
          <>
            {categoryData.length > 0 &&
              categoryData.map((cat) => (
                <li key={cat.id}>
                  <NavLink
                    to={`/list/${cat.id}`}
                    className={({ isActive }) =>
                      `${
                        isActive && "font-bold text-gray-800 bg-gray-200"
                      } flex items-center gap-2 py-2 px-3 hover:text-gray-800 rounded-lg  hover:bg-gray-200 `
                    }
                  >
                    <div
                      className="p-2  rounded-md"
                      style={{
                        backgroundColor: cat.color,
                      }}
                    ></div>
                    <span className="text-sm flex-1 font-semibold">
                      {cat.title}
                    </span>{" "}
                    <span className="flex items-center justify-center px-2 text-sm text-gray-700 bg-gray-200 rounded-md font-medium">
                      {
                        cat.tasks.filter((task) => task.is_completed === 0)
                          ?.length
                      }
                    </span>
                  </NavLink>
                </li>
              ))}
            <li>
              {!createIsPending ? (
                <button
                  className={`flex items-center gap-2 py-2 px-3  w-full rounded-md cursor-pointer transition-all  
              hover:text-gray-800 hover:bg-gray-200 "
            `}
                  onClick={onSubmitCategory}
                  disabled={createIsPending}
                >
                  <FaPlus size={15} />
                  <span className="text-sm font-semibold ">New List</span>
                </button>
              ) : (
                <>
                  <Skeleton height={30} />
                </>
              )}
            </li>
          </>
        ) : (
          <>
            <SidebarSkeleton />
          </>
        )}
      </ul>
    </>
  );
};

export default Category;
