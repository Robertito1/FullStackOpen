import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      console.log(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("Wrong credentials");
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
    console.log("logging in with", username, password);
  };

  const handleLogout = async () => {
    await window.localStorage.removeItem("loggedBlogappUser");
    await setUser(null);
    user === null ? console.log(user) : console.log("user");
  };
  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };
  const blogForm = () => {
    return (
      <div>
        <h2>Create New</h2>
        <form>
          <div>
            title:
            <input
            // value={newBlog}
            // onChange={handleBlogChange} onSubmit={addBlog}
            />
          </div>
          <div>
            author:
            <input
            // value={newBlog}
            // onChange={handleBlogChange}
            />
          </div>
          <div>
            url:
            <input
            // value={newBlog}
            // onChange={handleBlogChange} }
            />
          </div>
          <button type="submit">save</button>
        </form>
      </div>
    );
  };
  return (
    <div>
      <h2>blogs</h2>
      {user ? (
        <div>
          <p>
            {user.name} logged-in
            <span>
              <button onClick={handleLogout}>logout</button>
            </span>
          </p>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        loginForm()
      )}
    </div>
  );
};

export default App;
