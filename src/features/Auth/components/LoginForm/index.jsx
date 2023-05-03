import { Avatar, Button, LinearProgress, Typography } from "@mui/material";
import InputField from "Components/form-controls/InputField";
import PasswordField from "Components/form-controls/PasswordFiled";

import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./styles.scss";

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required("Please enter your email")
      .email("Please enter a valid email"),
    password: yup.string().required("Please enter your password"),
  });

  const form = useForm({
    defaultValues: {
      // cần có để handle lỗi Uncontrol
      identifier: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const handleFormSubmit = async (values) => {
    const { onSubmit } = props;

    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="container-wrap">
      {isSubmitting && <LinearProgress className="linear-progress" />}
      <Avatar className="avatar">{/* <LockOutlined></LockOutlined> */}</Avatar>
      <Typography className="title" component="h3">
        Sign In
      </Typography>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        {/* name owr ddaay phai dung */}
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />

        <Button
          type="submit"
          className="btn-submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
