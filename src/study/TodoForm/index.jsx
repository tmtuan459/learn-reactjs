import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};
TodoForm.defaultProps = {
  onSubmit: null,
};
function TodoForm(props) {
  const { onSubmit } = props;
  const [value, setValue] = useState("");

  function handleValueChange(e) {
    console.log(e.target.value);
    setValue(e.target.value);
  }
  function handleSubmit(e) {
    // prevent reloading browser/nếu ko có thì khi ấn enter sẽ bị reload pages
    e.preventDefault();
    if (!onSubmit) return;

    const formValue = {
      // làm thế này để tường minh hơn và dễ update field
      title: value,
    };

    onSubmit(formValue);

    setValue("");
  }
  return (
    <fieldset>
      <p>Form</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleValueChange} />
      </form>
    </fieldset>
  );
}

export default TodoForm;
