import { useEffect, useState } from "react";

import { useUpdateAvatar } from "../../../services/userService";

import ImageCropper from "../../../components/ImageCropper/ImageCropper";
import { FaCamera } from "react-icons/fa";

const Avatar = ({ user }) => {
  const [avatar, setAvatar] = useState(
    `${import.meta.env.VITE_AVATAR_URL}/default.jpg`
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState();

  const { mutate: updateMutation, isPending: updateIsPending } =
    useUpdateAvatar();

  useEffect(() => {
    if (user) {
      if (user?.avatar) {
        setAvatar(`${import.meta.env.VITE_AVATAR_URL}/${user?.avatar}`);
      }
    }
  }, [user]);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    e.preventDefault();

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

      if (!allowedTypes.includes(file?.type)) {
        setErrors(true);
        return;
      }

      if (file.size > 1024 * 1024 * 10) {
        setErrors(true);
        return;
      }

      setErrors(false);
      setIsModalOpen(true);

      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = null;
  };

  const handleSubmit = () => {
    setErrors(false);
    const data = {
      avatar,
    };
    console.log(data);
    updateMutation(data, {
      onSuccess: (response) => {
        console.log(response);
      },
      onError: (error) => {
        if (error.status === "error") {
          setErrors(true);
        }
      },
    });
  };

  return (
    <>
      <div className="relative w-40 z-30">
        <div className="relative w-40 h-40 overflow-hidden rounded-full  border">
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            title=" "
            className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer z-20"
            onChange={(e) => handleUpload(e)}
          />
          <img className="relative w-40 h-40 object-cover" src={avatar} />
        </div>

        {user && (
          <label
            htmlFor="avatar"
            className="cursor-pointer bg-gray-100 text-gray-700 p-2 rounded-full absolute right-2 bottom-2 border border-gray-200"
          >
            <FaCamera />
          </label>
        )}
      </div>

      <div className="flex items-center mt-2">
        <span
          className={`text-sm  ${errors ? "text-red-500" : "text-gray-500"}`}
        >
          Image should be less than 10MB and in jpeg, jpg or png format
        </span>
      </div>

      {isModalOpen && (
        <ImageCropper
          avatar={avatar}
          setCroppedImage={setAvatar}
          setIsModalOpen={setIsModalOpen}
          handleSubmit={handleSubmit}
          updateIsPending={updateIsPending}
        />
      )}
    </>
  );
};

export default Avatar;
