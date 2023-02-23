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
  const { errors, formState } = form;
  const hasError = formState.touched[name] && errors[name];
  console.log(errors[name], formState.touched[name]);

  return (
    <Controller
      name={name} // bắt buộc phải có
      control={form.control} // bắt buộc phải có
      as={TextField} //sử dụng Ui libary nào // nếu dùng onChange,.. thì xài render
      margin="normal"
      variant="outlined"
      fullWidth // truyền vào TextField
      label={label}
      disabled={disabled}
      error={!!hasError} //!! chuyển về true false
      helperText={errors[name]?.message} // thêm ? ở đây nếu không chắc nó chứa message hay k //nếu ko thêm thì sẽ lỗi
    />
  );
}

export default InputField;
