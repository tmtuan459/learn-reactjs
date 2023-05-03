import { Box, Container, Grid, Pagination, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import productApi from "api/productApi";
import { useEffect, useState } from "react";
import ProductFilters from "../components/ProductFilters";
import ProductList from "../components/ProductList";
import ProductSkeletonList from "../components/ProductSkeletonList";
import ProductSort from "../components/ProductSort";

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: "250px",
  },

  right: {
    flex: "1 1 0",
  },
  pagination: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    marginTop: "20px",
    paddingBottom: "20px",
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 10,
    total: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    // set thoe đúng như API
    _page: 1,
    _limit: 10,
    _sort: "salePrice:ASC",
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters); //Destructuring là một cú pháp cho phép bạn gán các thuộc tính của một Object hoặc một Array.

        setProductList(data);
        setPagination(pagination); // gán pagination bằng pagination từ API trả về
        // console.log(data, pagination);
      } catch (error) {
        console.log("Failed to fetch product list", error);
      }

      setLoading(false);
    })(); //day la IIFE có nghĩa là khởi tạo một function và thực thi nó ngay lập tức.
  }, [filters]);

  const handlePageChange = (e, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters, // giữ các giá trị trước đó
      _page: page, // đổi page sang page mới
    }));
  };

  const handleSortChange = (newSortValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters, // giữ các giá trị trước đó
      _sort: newSortValue, // đổi page sang page mới
    }));
  };

  // 1 những filter thay đổi thì báo lên thằng cha, cha sẽ set lại filter bằng các giá trị preFilter hiện tại và giá trị filter mới thằng con báo lên
  const handleFiltersChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters, // giữ các giá trị trước đó
      ...newFilters, // obj chứa các giá trị filter mới
    }));
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={1}>
              <ProductFilters
                filters={filters}
                onChange={handleFiltersChange}
              />
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            {/* Start Sort List */}
            {/* những control  liên quan đến UI và filter đẩy sang component */}

            <Paper elevation={1}>
              <Box>
                <ProductSort
                  currentSort={filters._sort}
                  onChange={handleSortChange}
                />
              </Box>
            </Paper>
            {/* End Sort List */}

            {/* Start Product List */}
            <Paper elevation={1}>
              {loading ? (
                <ProductSkeletonList />
              ) : productList.length > 0 ? (
                <ProductList data={productList} />
              ) : (
                <span
                  style={{
                    display: "block",
                    paddingTop: "20px",
                    textAlign: "center",
                  }}
                >
                  Không tìm thấy sản phẩm nào!
                </span>
              )}

              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                ></Pagination>
              </Box>
            </Paper>

            {/* End Product List */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
