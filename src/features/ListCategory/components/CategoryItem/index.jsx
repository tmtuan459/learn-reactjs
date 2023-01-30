import "./styles.scss";

function CategoryItem({ props }) {
  return (
    <div className="category">
      <div className="category__thumbnail">
        <img src={props.thumbnailUrl} alt={props.title} />
      </div>
      <p className="category__name">{props.title}</p>
    </div>
  );
}
export default CategoryItem;
