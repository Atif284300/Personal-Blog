import React from "react";

const About = () => {
  return (
    <div className="page-header">
      <h1>About This Blog</h1>
      <div style={{ textAlign: "left", maxWidth: "800px", margin: "0 auto" }}>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.8",
            marginBottom: "1rem",
          }}
        >
          Hi, I’m Atif. Welcome to my personal blog! Here I share my thoughts,
          experiences, and ideas on different topics that interest me.
        </p>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.8",
            marginBottom: "1rem",
          }}
        >
          This blog is built with the MERN stack (MongoDB, Express.js, React.js,
          Node.js) and makes it easy to create, edit, and manage posts.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
          Thanks for stopping by!
        </p>
      </div>
    </div>
  );
};

export default About;
