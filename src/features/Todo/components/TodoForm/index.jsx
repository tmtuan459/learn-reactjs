import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../Components/form-controls/InputField";

TodoForm.propTypes = {
  onSubmit: PropTypes.func, // phím tắt Ptf
};

function TodoForm(props) {
  // validation - coppy
  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Please enter title")
      .min(5, "Title is too short"),
  });

  const form = useForm({
    defaultValues: {
      title: "", // cần liệt kê ở đây nếu khoonh sẽ gặp tình trạng không biết nó là gì lõi: UnControl
    },
    resolver: yupResolver(schema),
  });

  const handleSubmitAction = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmitAction)}>
      <h3>Todo Form</h3>
      <InputField name="title" label="TodoForm" form={form} />
    </form>
  );
}

export default TodoForm;
