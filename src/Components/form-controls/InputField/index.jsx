import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;

  return (
    <Controller
      name={name} // bắt buộc phải có
      control={form.control} // bắt buộc phải có
      as={TextField} //sử dụng Ui libary nào // nếu dùng onChange,.. thì xài render
      fullWidth // truyền vào TextField
      label={label}
      disabled={disabled}
    />
  );
}

export default InputField;
