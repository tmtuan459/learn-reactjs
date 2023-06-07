import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, FormHelperText, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles(() => ({
  root: {},
  box: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    maxWidth: "150px",
  },
}));
function QuantityField(props) {
  const classes = useStyles();
  const { form, name, label, disabled } = props;
  const { errors, setValue } = form;
  const hasError = !!errors[name];

  return (
    <div>
      <FormControl
        error={hasError}
        fullWidth
        variant="outlined"
        margin="normal"
        size="small"
      >
        <Typography>{label}</Typography>

        <Controller
          name={name} // bắt buộc phải có
          control={form.control} // bắt buộc phải có
          //as={OutlinedInput} old version //sử dụng Ui libary nào // nếu dùng onChange,.. thì xài render
          //name: tên của control
          render={({ onChange, onBlur, value, name }) => (
            <Box className={classes.box}>
              <IconButton
                onClick={
                  () =>
                    setValue(
                      name,
                      Number.parseInt(value) ? Number.parseInt(value) - 1 : 1
                    ) //parse failed thì lấy số 1, ở đây cover thôi
                }
              >
                <RemoveCircleOutline></RemoveCircleOutline>
              </IconButton>

              <OutlinedInput
                id={name}
                type="number"
                label={label}
                disabled={disabled}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />

              <IconButton
                onClick={() =>
                  setValue(
                    name,
                    Number.parseInt(value) ? Number.parseInt(value) + 1 : 1
                  )
                }
              >
                <AddCircleOutline></AddCircleOutline>
              </IconButton>
            </Box>
          )}
        />
        <FormHelperText>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}

export default QuantityField;
