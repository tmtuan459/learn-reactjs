import { Box, Container, Grid, Pagination, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import productApi from "api/productApi";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import FilterViewer from "../components/FilterViewer";
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

  const history = useHistory(); // URL
  const location = useLocation(); // lấy ra URL hiện tại // khi url thay đổi thì nó tự trả về 1 obj location mới
  const queryParams = useMemo(() => {
    // tính toán lại mỗi lần location search thay đổi
    //đưa chuỗi parse ra obj // đây là value sau ?
    // vì queryString chỉ trả về kiểu chuỗi nên cần tạo ra giá trị default như thế này
    const params = queryString.parse(location.search);

    return {
      ...params, // vì queryParams luôn luôn là chuỗi nên page và limit muốn thành số thì cần convert
      _page: Number.parseInt(params._page) || 1, // lấy từ query params, ko có thì sẽ lấy là 1
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || "salePrice:ASC",
      isPromotion: params.isPromotion === "true",
      isFreeShip: params.isFreeShip === "true",
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 10,
    total: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(true);

  // CODE CŨ: Tùy nhu cầu:  Vì nếu xài filter thì khúc ấn nút back trên browser thì nó đổi url nhưng filter không đổi thành ra chưa đúng
  // const [filters, setFilters] = useState(() => ({
  //   // code này handle việc user import url chứa cả filter vào, và reload page ko bị mất filter
  //   ...queryParams, // vì queryParams luôn luôn là chuỗi nên page và limit muốn thành số thì cần convert
  //   _page: Number.parseInt(queryParams._page) || 1, // lấy từ query params, ko có thì sẽ lấy là 1
  //   _limit: Number.parseInt(queryParams._limit) || 9,
  //   _sort: queryParams._sort || "salePrice:ASC",
  // }));

  // Vì nếu xài filter thì khúc ấn nút back trên browser thì nó đổi url nhưng filter không đổi thành ra chưa đúng
  // useEffect(() => {
  //   // TODO: Sync filter to URL

  //   history.push({
  //     // recommend là xài location nhưng trong case này thì phải xài history để tránh lặp vô tận
  //     pathname: history.location.pathname, // lấy của đường dẫn hiện tại
  //     search: queryString.stringify(filters), // chuyển obj thành chuỗi có thể thấy
  //   });
  // }, [history, filters]); // history ko thay đổi nhưng có cần nằm trong này

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams); //Destructuring là một cú pháp cho phép bạn gán các thuộc tính của một Object hoặc một Array.

        setProductList(data);
        setPagination(pagination); // gán pagination bằng pagination từ API trả về
        // console.log(data, pagination);
      } catch (error) {
        console.log("Failed to fetch product list", error);
      }

      setLoading(false);
    })(); //day la IIFE có nghĩa là khởi tạo một function và thực thi nó ngay lập tức.
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters, // giữ các giá trị trước đó
    //   _page: page, // đổi page sang page mới
    // }));

    const filters = {
      ...queryParams, // giữ các giá trị trước đó
      _page: page,
    };

    history.push({
      pathname: history.location.pathname, // lấy của đường dẫn hiện tại
      search: queryString.stringify(filters), // chuyển obj thành chuỗi có thể thấy
    });
  };

  const handleSortChange = (newSortValue) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters, // giữ các giá trị trước đó
    //   _sort: newSortValue, // đổi page sang page mới
    // }));

    const filters = {
      ...queryParams, // giữ các giá trị trước đó
      _sort: newSortValue,
    };

    history.push({
      pathname: history.location.pathname, // lấy của đường dẫn hiện tại
      search: queryString.stringify(filters), // chuyển obj thành chuỗi có thể thấy
    });
  };

  // 1 những filter thay đổi thì báo lên thằng cha, cha sẽ set lại filter bằng các giá trị preFilter hiện tại và giá trị filter mới thằng con báo lên
  const handleFiltersChange = (newFilters) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters, // giữ các giá trị trước đó
    //   ...newFilters, // obj chứa các giá trị filter mới
    // }));

    const filters = {
      ...queryParams, // giữ các giá trị trước đó
      ...newFilters,
    };

    history.push({
      pathname: history.location.pathname, // lấy của đường dẫn hiện tại
      search: queryString.stringify(filters), // chuyển obj thành chuỗi có thể thấy
    });
  };

  const setNewFilters = (newFilters) => {
    history.push({
      pathname: history.location.pathname, // lấy của đường dẫn hiện tại
      search: queryString.stringify(newFilters), // chuyển obj thành chuỗi có thể thấy
    });
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={1}>
              <ProductFilters
                filters={queryParams}
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
                  currentSort={queryParams._sort}
                  onChange={handleSortChange}
                />
                <FilterViewer filters={queryParams} onChange={setNewFilters} />
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
