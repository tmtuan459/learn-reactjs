import "./styles.scss";
import PropTypes from "prop-types";

CategoryItem.propTypes = {
  props: PropTypes.object,
  triggerCategoryItemOnclick: PropTypes.func,
};

CategoryItem.defaultProps = {
  props: [],
  triggerCategoryItemOnclick: null,
};

export default function CategoryItem({
  props,
  idxItem,
  triggerCategoryItemOnclick,
}) {
  const CategoryOnClick = (idxItem) => {
    if (!triggerCategoryItemOnclick) return;

    triggerCategoryItemOnclick(idxItem);
  };

  return (
    <div className="category">
      <div className="category__thumbnail">
        <img src={props.thumbnailUrl} alt={props.title} />
      </div>
      <p className="category__name">{props.title}</p>
      <button
        onClick={() => {
          CategoryOnClick(idxItem);
        }}
      >
        Active
      </button>
    </div>
  );
}
// export default CategoryItem; có thể export như ở dòng 14
