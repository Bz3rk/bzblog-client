import React from "react";
import { Link } from "react-router-dom";

const Card = ({ blogs }) => {
  const renderParagraphs = (blogs) => {
    return blogs.split("\n").map((paragraph, index) => {
      const segments = paragraph.split("*");
      return (
        <p key={index} className="mb-2">
          {segments.map((segment, idx) => {
            if (idx % 2 === 0) {
              return segment;
            } else {
              return <strong key={idx}>{segment}</strong>;
            }
          })}
        </p>
      );
    });
  };

  return (
    <div className="col col-span-4">
      <div className=" text-xl md:text-2xl font-sans text-center rounded-md drop-shadow-md text-white p-2 font-semibold bg-primary-600">
        Recent Blogs
      </div>

      <div className=" mx-auto md:grid md:grid-cols-2 ">
        {/* card */}
        {blogs.map((blog) => (
          <div
            className=" mx-2 my-4 bg-white drop-shadow-md rounded-md "
            key={blog.id}
          >
            <Link to={`/blog/${blog.id}`}>
              <img
                className=" rounded-md "
                src="img/blog2.png"
                alt="girl blog"
              />
              <div className=" p-2 pb-4">
                <small className="font-semibold">Author:</small>
                {blog.author && (
                  <strong>
                    {" "}
                    <small className=" text-primary-600 italic">
                      {" "}
                      {blog.author.email}
                    </small>
                  </strong>
                )}
                {blog.topic && (
                  <h6 className="text-2xl font-mont font-medium">
                    {blog.topic.name}
                  </h6>
                )}

                {blog && <div>{renderParagraphs(blog.body.slice(0, 200))}</div>}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
