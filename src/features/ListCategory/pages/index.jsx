import { useState } from "react";
import ListCategory from "../components/CategoryList";
import "./styles.scss";

function ListCategoryFeature() {
  const listCategoryInit = [
    {
      id: 1,
      title: "Pop",
      thumbnailUrl:
        "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/4/e/e/7/4ee7fcca9e824104baeaedb2f5634e0b.jpg",
      status: true,
    },
    {
      id: 2,
      title: "Rock",
      thumbnailUrl:
        "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/7/4/1/1/74115c2f066171ef5c7df20d6704468c.jpg",
      status: false,
    },
    {
      id: 3,
      title: "Ballad",
      thumbnailUrl:
        "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/0/7/2/f/072f9c94b1d6dec51a2ff67b520911e4.jpg",
      status: true,
    },
    {
      id: 4,
      title: "Jazz",
      thumbnailUrl:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/3/d/8/9/3d892d99220c424542f00fcab07b854d.jpg",
      status: true,
    },
  ];

  //const a = demo(); //đây gọi là initial state chỉ render lần đầu, render những lần sau không đc re-render

  const [categoryList, setCategoryList] = useState(listCategoryInit);
  const [FilterStatus, setFilterStatus] = useState("all");

 
  const CategoryOnClick = (idx) => {
    const newCategoryList = [...categoryList];

    newCategoryList[idx] = {
      ...newCategoryList[idx], // lấy ra object để xài ở dưới
      status: newCategoryList[idx].status === true ? false : true,
    };
    console.log(newCategoryList[idx]);

    setCategoryList(newCategoryList);
  };

  const renderCategoryList = categoryList.filter(
    (category) => FilterStatus === "all" || FilterStatus === category.status
  );

  const ShowAllItem = () => {
    setFilterStatus("all");
  };
  const ShowActiveItem = () => {
    setFilterStatus(true);
  };
  const ShowDeactiveItem = () => {
    setFilterStatus(false);
  };

  return (
    <fieldset>
      <legend>ListCategory</legend>
      <div className="button-group">
        <button onClick={ShowAllItem}>Show All Item</button>
        <button onClick={ShowActiveItem}>Show Active Item</button>
        <button onClick={ShowDeactiveItem}>Show Deactive Item</button>
      </div>
      <ListCategory
        listcatetory={renderCategoryList}
        CategoryOnClickTrigger={CategoryOnClick}
      />
    </fieldset>
  );
}
export default ListCategoryFeature;
