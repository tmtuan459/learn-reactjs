import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  const { errors, formState } = form;
  const hasError = formState.touched[name] && errors[name];

  return (
    <Controller
      name={name} // bắt buộc phải có
      control={form.control} // bắt buộc phải có
      as={TextField} //sử dụng Ui libary nào // nếu dùng onChange,.. thì xài render
      fullWidth // truyền vào TextField
      label={label}
      disabled={disabled}
      error={!!hasError} //!! chuyển về true false
      helperText={errors[name]?.message} // thêm ? ở đây nếu không chắc nó chứa message hay k //nếu ko thêm thì sẽ lỗi
    />
  );
}

export default InputField;
