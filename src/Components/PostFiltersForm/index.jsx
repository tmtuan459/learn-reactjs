import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

PostFiltersForm.propTypes = {
  onSubmit: PropTypes.func,
};
PostFiltersForm.defaultProps = {
  onSubmit: null,
};
// Cách áp dụng debounce: gõ xong mới submit lên
function PostFiltersForm(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null); //tạo ra 1 object và không thay đổi giữa các lần render

  function handleChangeTermChange(e) {
    const value = e.target.value;
    setSearchTerm(value);

    if (onSubmit) {
      // trước khi set timeout mới thì clear timeout cũ
      // không dừng gõ sẽ không submit
      if (typingTimeoutRef.current) {
        // kiểm tra lần trước có setTimeout chưa
        clearTimeout(typingTimeoutRef.current); // nếu có thì clear
      }
      typingTimeoutRef.current = setTimeout(() => {
        const formValues = {
          searchTerm: value, //nếu xài e.target.value và nếu xài setTimeout thì e sẽ bị release sớm. nên gán vào 1 biến tạm(eg: value)
        };
        onSubmit(formValues);
      }, 300);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <hr />
      <label htmlFor="">Search</label>{" "}
      <input
        type="text"
        value={searchTerm}
        onChange={handleChangeTermChange}
        placeholder="Please input the data"
      />
    </form>
  );
}

export default PostFiltersForm;
