import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Modal = ({
  children,
  title,
  className,
  onPositiveButtonClick,
  isPositiveButtonLoading,
  setIsModalOpen,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return createPortal(
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
        <div
          className={`bg-white rounded-lg p-5 pt-0 ${className ? className : "w-[900px]"}`}
        >
          <div className="flex flex-col gap-5 pt-3">
            {title && (
              <div>
                <h1 className="text-xl font-bold text-center text-gray-700 pb-3">
                  {title}
                </h1>
                <hr />
              </div>
            )}
            <div className="max-h-[70vh] overflow-y-auto p-2">
              {children}
              <div className="flex gap-5 mt-5 justify-end">
                <button
                  className="btn-primary px-4 py-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn-secondary px-4 py-2"
                  onClick={onPositiveButtonClick}
                  disabled={isPositiveButtonLoading}
                >
                  {isPositiveButtonLoading ? (
                    <AiOutlineLoading3Quarters
                      size={15}
                      className="animate-spin"
                    />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
