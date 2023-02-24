import { unwrapResult } from "@reduxjs/toolkit";
import { register } from "features/Auth/userSlice";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import RegisterForm from "../RegisterForm";

Register.propTypes = {};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      // auto set username = email (chỉ là bài tập)
      values.username = values.email;
      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction); //lấy kết quả ra

      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }

      console.log("New user", user);
      enqueueSnackbar("Register Successfully !!", { variant: "success" });
    } catch (error) {
      console.log("Failed to register", error);
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
