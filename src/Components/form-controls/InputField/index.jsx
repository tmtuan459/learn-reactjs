import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  const { errors } = form;
  const hasError = errors[name];

  return (
    <Controller
      name={name} // bắt buộc phải có
      control={form.control} // bắt buộc phải có
      //as={TextField} version cux //sử dụng Ui libary nào // nếu dùng onChange,.. thì xài render
      render={({ onChange, onBlur, value, name, ref }) => (
        <TextField
          margin="normal"
          variant="outlined"
          fullWidth // truyền vào TextField
          label={label}
          disabled={disabled}
          error={!!hasError} //!! chuyển về true false
          helperText={errors[name]?.message} // thêm ? ở đây nếu không chắc nó chứa message hay k //nếu ko thêm thì sẽ lỗi
          name={name}
          value={value}
          // render thì phải control onChage, onBlur,,
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    />
  );
}

export default InputField;
