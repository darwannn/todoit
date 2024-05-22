import { ChromePicker } from "react-color";
import { Controller } from "react-hook-form";

const ColorPicker = ({ control }) => {
  return (
    <div>
      <p>Choose Color</p>
      <Controller
        control={control}
        name="color"
        render={({ field: { onChange, value } }) => (
          <ChromePicker
            width="100%"
            height="100%"
            onChange={onChange}
            color={value}
          />
        )}
      />
    </div>
  );
};

export default ColorPicker;
