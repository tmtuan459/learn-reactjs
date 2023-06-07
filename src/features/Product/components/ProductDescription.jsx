import React from "react";
import PropTypes from "prop-types";
import { Paper } from "@mui/material";
import DOMPurify from "dompurify";

ProductDescription.propTypes = {
  product: PropTypes.object,
};

function ProductDescription({ product = {} }) {
  //sử dụng dangerouslySetInnerHTML để render data dạng html
  // nhưng khá nguy hiểm, nếu như data chứa các script XSS thì dễ bị tấn công bởi hacker
  // sử dụng DOM Purify để loại trừ các nguy cơ tìm ẩn
  // Bất cứ khi nào render chuỗi HTML lên FE thì cần check cái này
  const safeDescription = DOMPurify.sanitize(product.description);
  return (
    <Paper elevation={0} style={{ padding: "15px" }}>
      <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
    </Paper>
  );
}

export default ProductDescription;
