import { Avatar, Button, LinearProgress, Typography } from "@mui/material";
import InputField from "Components/form-controls/InputField";
import PasswordField from "Components/form-controls/PasswordFiled";

import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./styles.scss";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const schema = yup.object().shape({
    fullName: yup.string().required("Please enter your name"),
    email: yup
      .string()
      .required("Please enter your email")
      .email("Please enter a valid email"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(6, "Please enter at least 6 characters"),
    retypePassword: yup
      .string()
      .required("Please enter your password")
      .min(6, "Please enter at least 6 characters"),
  });

  const form = useForm({
    defaultValues: {
      // cần có để handle lỗi Uncontro
      fullName: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });
  const handleFormSubmit = async (values) => {
    const { onSubmit } = props;

    if (onSubmit) {
      await onSubmit(values);
    }

    form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="container-wrap">
      {isSubmitting && <LinearProgress className="linear-progress" />}
      <Avatar className="avatar">{/* <LockOutlined></LockOutlined> */}</Avatar>
      <Typography className="title" component="h3">
        Create an account
      </Typography>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        {/* name owr ddaay phai dung */}
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField
          name="retypePassword"
          label="Retype Password"
          form={form}
        />

        <Button
          type="submit"
          className="btn-submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting}
        >
          Create an account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
