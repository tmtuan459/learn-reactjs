import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

PostFiltersForm.propTypes = {
  onSubmit: PropTypes.func,
};
PostFiltersForm.defaultProps = {
  onSubmit: null,
};
// Cách áp dụng debounce: gõ xong mới submit lên
function PostFiltersForm(props) {
  const { onSubmit, postList } = props;
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
      <Stack>
        <Autocomplete
          // id="free-solo-2-demo"
          disableClearable
          options={postList.map((option) => option.title)}
          value={searchTerm}
          defaultValue=""
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              onChange={handleChangeTermChange}
            />
          )}
          isOptionEqualToValue={(option, value) =>
            value === undefined || value === "" || option.id === value.id
          }
        />
      </Stack>
    </form>
  );
}

export default PostFiltersForm;
