import React from "react";
import { useLocation } from "react-router";
import data from "./Data";
import "../index.css";
const BlogDetails = () => {
  const location = useLocation().pathname.split("/")[2];
  const blogData = data.find((d) => d.id === location);
  return (
    <div>
      <h1>Welcome</h1>
      <div className="blog">
        <div>
          {" "}
          <img
            style={{ height: "300px", width: "400px", marginLeft: "20px" }}
            src={blogData.image}
            alt={blogData.name}
          />
        </div>
        <div style={{ flex: 1, marginLeft: "50px", padding: "10px" }}>
          <h3> Blog Name :{blogData.name}</h3>
          <h4 style={{ marginTop: "10px" }}>Author :{blogData.author}</h4>
          <p style={{ marginTop: "10px" }}>
            <b> Description </b>:{blogData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
