import { useState, useContext } from "react";
import tinycolor from "tinycolor2";

import { useGetTags } from "../../services/tagService";
import { Context } from "../../context/Context";

import TagForm from "./TagForm";

import { FaPlus } from "react-icons/fa";
import SidebarSkeleton from "../Skeleton/SidebarSkeleton";

const Tag = ({ isSidebarOpen }) => {
  const { setSelectedTag } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: tags } = useGetTags();
  const tagData = tags?.data?.tags;

  return (
    <>
      {isModalOpen && (
        <TagForm setIsModalOpen={setIsModalOpen} tagData={tagData} />
      )}

      {isSidebarOpen && (
        <ul className="space-y-1">
          <li className="font-bold text-gray-700 text-sm">TAGS</li>

          {tagData ? (
            <li className="flex flex-wrap gap-1.5">
              {tagData.length > 0 &&
                tagData.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelectedTag(tag);
                    }}
                    className={`text-xs py-1.5 px-3 rounded-md ${
                      tinycolor(tag.color).getBrightness() > 180
                        ? "text-gray-700"
                        : "text-white"
                    }`}
                    style={{
                      backgroundColor: tag.color,
                    }}
                  >
                    {tag.title}
                  </button>
                ))}
              <span
                className="inline-flex justify-center items-center gap-2 bg-gray-200 text-xs text-gray-500   hover:text-gray-700 py-1 px-3 transition-all rounded-md cursor-pointer"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <FaPlus size={10} /> New Tag
              </span>
            </li>
          ) : (
            <SidebarSkeleton />
          )}
        </ul>
      )}
    </>
  );
};

export default Tag;
