import React from "react";
import PropTypes from "prop-types";

PostList.propTypes = {
  postList: PropTypes.array,
};
PostList.defaultProps = {
  postList: [],
};

function PostList(props) {
  const { pagination, postList } = props; // khi bao
  
  return (
    <fieldset>
      <legend>Post List API</legend>

      <ul>
        {postList.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <div>{pagination._page}</div>
    </fieldset>
  );
}

export default PostList;
