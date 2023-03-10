import React from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup } from "@mui/material";

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};
Pagination.defaultProps = {
  onPageChange: null, // theo best pratice cần set null chỗ này
};

function Pagination(props) {
  const { pagination, onPageChange } = props;
  const { _page, _limit, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit); //ceil laays upto ex: 51/10 ==> 5.6 => 6

  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }
  return (
    <div>
      <ButtonGroup variant="text" aria-label="text button group">
        <Button
          disabled={_page <= 1}
          onClick={() => handlePageChange(_page - 1)}
        >
          {" "}
          Prev
        </Button>
        <Button
          disabled={_page >= totalPages}
          onClick={() => handlePageChange(_page + 1)}
        >
          next
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default Pagination;
