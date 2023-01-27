import AlbumList from "./components/AlbumList";

AlbumFeature.propTypes = {};

function AlbumFeature(props) {
  const albumList = [
    {
      id: 1,
      name: "Nhạc Mới Tết Này",
      thumbnailUrl:
        "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/4/e/e/7/4ee7fcca9e824104baeaedb2f5634e0b.jpg",
    },
    {
      id: 2,
      name: "Lắng Đọng Xuân",
      thumbnailUrl:
        "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/7/4/1/1/74115c2f066171ef5c7df20d6704468c.jpg",
    },
    {
      id: 3,
      name: "Song Ca Nhạc Xuân",
      thumbnailUrl:
        "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/0/7/2/f/072f9c94b1d6dec51a2ff67b520911e4.jpg",
    },
    {
      id: 4,
      name: "Rap Vui Ngày Tết",
      thumbnailUrl:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/3/d/8/9/3d892d99220c424542f00fcab07b854d.jpg",
    },
    {
      id: 5,
      name: "Nhạc Xuân Hay Nhất",
      thumbnailUrl:
        "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/6/f/d/8/6fd8a0ae2ef979a2e77d67dde5c8c91c.jpg",
    },
  ];

  return (
    <fieldset>
      <legend>
        <h3>Có thể bạn sẽ thích đấy</h3>
      </legend>
      <AlbumList albumList={albumList} />
    </fieldset>
  );
}

export default AlbumFeature;
