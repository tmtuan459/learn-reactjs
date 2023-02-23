import { Avatar, Button, Typography } from "@mui/material";
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
  const schema2 = yup
    .object({
      fullName: yup.string().required("Test"),
    })
    .required();

  const form = useForm({
    defaultValues: {
      // cần có để handle lỗi Uncontro
      fullName: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema2),
  });
  const handleFormSubmit = (values) => {
    const { onSubmit } = props;

    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <div className="container-wrap">
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
          className="btn-submit"
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
        >
          Create an account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
