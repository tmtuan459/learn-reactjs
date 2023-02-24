import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import PropTypes from "prop-types";
import { useState } from "react";
import { Controller } from "react-hook-form";

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function PasswordField(props) {
  const { form, name, label, disabled } = props;
  const { errors } = form;
  const hasError = errors[name];
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Controller
          name={name} // bắt buộc phải có
          control={form.control} // bắt buộc phải có
          as={OutlinedInput} //sử dụng Ui libary nào // nếu dùng onChange,.. thì xài render
          id={name}
          type={showPassword ? "text" : "password"}
          label={label}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          disabled={disabled}
          error={!!hasError} //!! chuyển về true false
          // helperText={errors[name]?.message} //OutlinedInput ko hoox troj  thêm ? ở đây nếu không chắc nó chứa message hay k //nếu ko thêm thì sẽ lỗi
        />
        <FormHelperText error={!!hasError}>
          {errors[name]?.message}
        </FormHelperText>
      </FormControl>
    </div>
  );
}

export default PasswordField;
