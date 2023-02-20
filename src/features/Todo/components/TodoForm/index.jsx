import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";

import InputField from "../../../../Components/form-controls/InputField";

TodoForm.propTypes = {
  onSubmit: PropTypes.func, // phím tắt Ptf
};

function TodoForm(props) {
  const form = useForm({
    defaultValues: {
      title: "", // cần liệt kê ở đây nếu khoonh sẽ gặp tình trạng không biết nó là gì lõi: UnControl
    },
  });

  const handleSubmitAction = (values) => {
    console.log("TodoForm", values);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmitAction)}>
      <h3>Todo Form</h3>
      <InputField name="title" label="TodoForm" form={form} />
    </form>
  );
}

export default TodoForm;
