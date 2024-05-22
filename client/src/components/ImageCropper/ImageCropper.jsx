import { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import Modal from "../Modal/Modal";

const ImageCropper = ({
  avatar,
  setCroppedImage,
  handleSubmit,
  updateIsPending,
  setIsModalOpen,
}) => {
  const cropperRef = useRef();

  const getCroppedImage = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedImage = cropperRef.current.cropper
        .getCroppedCanvas()
        .toDataURL();
      setCroppedImage(croppedImage);
      handleSubmit();
      setIsModalOpen(false);
    }
  };

  return (
    <Modal
      onPositiveButtonClick={getCroppedImage}
      isPositiveButtonLoading={updateIsPending}
      setIsModalOpen={setIsModalOpen}
      title="Crop Avatar"
    >
      {avatar && (
        <div>
          <Cropper
            ref={cropperRef}
            style={{ height: 400, width: "100%" }}
            aspectRatio={1}
            src={avatar}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
            zoomOnWheel={true}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImageCropper;
