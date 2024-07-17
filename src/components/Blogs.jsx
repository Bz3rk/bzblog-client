import React from "react";
import Card from "./Card";
import Sidecard from "./Sidecard";

const Blogs = ({ blogs, topics }) => {
  return (
    <div className=" md:grid md:grid-cols-6 gap-4 mx-4 md:mx-16 mt-5">
      <Card blogs={blogs} />
      <Sidecard topics={topics} />
    </div>
  );
};

export default Blogs;
