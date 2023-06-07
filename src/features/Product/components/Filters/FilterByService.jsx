import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { PropTypes } from "prop-types";

const useStyle = makeStyles(() => ({
  root: {
    borderTop: "1px solid gray",
    padding: "8px",
  },

  list: {
    padding: 0,
    margin: 0,
    listStyleType: "none",

    "& > li": {
      margin: 0,
      marginTop: "8px",
    },
  },
}));
FilterByService.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function FilterByService({ filters = {}, onChange }) {
  const classes = useStyle();

  const handlechange = (e) => {
    if (!onChange) return;

    const { name, checked } = e.target;
    onChange({ [name]: checked }); //truyền new value có key là name và giá trị mới là checked
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2"> DỊCH VỤ</Typography>

      <ul className={classes.list}>
        {[
          { value: "isPromotion", label: "Có khuyến mãi" },
          { value: "isFreeShip", label: "Vận chuyển miễn phí" },
        ].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              label={service.label}
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])} // ở dây có nghĩa nó sẽ lấy filters.isPromotion và .isFreeship
                  // ban đầu chưa có nên bị lỗi undefined nên cần convert về boolean
                  onChange={handlechange}
                  name={service.value}
                  color="primary"
                />
              }
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
