import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, handleDelete, user }) => {
  const [expand, setExpand] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  let action = expand ? "collapse" : "expand";

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const addLike = async () => {
    try {
      const blogToUpdate = { ...blog, likes: likes + 1 };
      const id = blog.id;
      await blogService.update(blogToUpdate, id);
      setLikes(likes + 1);
      console.log(blogToUpdate, id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={blogStyle} className="blog">
      {expand ? (
        <div>
          <p>
            {blog.title} {blog.author}
            <span>
              <button onClick={() => setExpand(!expand)}>{action}</button>
            </span>
          </p>
          <p>{blog.url}</p>
          <p>
            {likes}
            <span>
              <button onClick={() => addLike()}>like</button>
            </span>
          </p>
          <p>{blog.user.name}</p>
          {user.name === blog.user.name ? (
            <button
              style={{
                backgroundColor: "blue",
                border: "none",
                borderRadius: "5px",
              }}
              onClick={() => handleDelete(blog)}
            >
              delete
            </button>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div>
          {blog.title} {blog.author}
          <span>
            <button onClick={() => setExpand(!expand)}>{action}</button>
          </span>
        </div>
      )}
    </div>
  );
};
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
