import "./styles.scss";
import classNames from "classnames";
import PropTypes from "prop-types";
import CategoryItem from "../CategoryItem";

ListCategory.propTypes = {
  listcatetory: PropTypes.array,
  CategoryOnClickTrigger: PropTypes.func,
};

ListCategory.defaultProps = {
  listcatetory: [],
  CategoryOnClickTrigger: null,
};

function ListCategory({ listcatetory, CategoryOnClickTrigger }) {
  const CategoryOnClick = (idx) => {
    if (!CategoryOnClickTrigger) return;

    CategoryOnClickTrigger(idx);
  };

  return (
    <ul className="list-category">
      {listcatetory.map((category, idx) => (
        <li
          key={category.id}
          className={classNames({
            active: category.status === true,
          })}
          onClick={() => {
            CategoryOnClick(idx);
          }}
        >
          <CategoryItem props={category} />
        </li>
      ))}
    </ul>
  );
}
export default ListCategory;
