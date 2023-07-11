// Ví dụ trường trang quá nhiều tách fetdch dữ liệu sang chỗ khác thì có thể tạo custom hook
// Custom hook

import productApi from "api/productApi";
import { useEffect, useState } from "react";

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // (() => {})() : IIFE là viết tắt của Immediately Invoked Function Expression, có nghĩa là khởi tạo một function và thực thi nó ngay lập tức.
    (async () => {
      try {
        setLoading(true);
        const result = await productApi.get(productId);

        setProduct(result);
      } catch (error) {
        console.log("failed to fetch product", error);
      }

      setLoading(false);
    })();
  }, [productId]);

  return { product, loading };
}
