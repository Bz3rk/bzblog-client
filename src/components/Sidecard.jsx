import React from "react";
import moment from "moment";

const Sidecard = ({ topics }) => {
  return (
    <div className="hidden md:block col col-span-2">
      <div className=" text-xl font-sans text-center rounded-md drop-shadow-md text-white p-2 font-semibold bg-primary-600">
        Popular topics
      </div>
      {topics.map((topic) => (
        <div className=" bg-white drop-shadow-xl p-2 m-2" key={topic.id}>
          <h6 className=" font-sans font-medium text-md hover:text-primary-800 hover:drop-shadow-sm cursor-pointer ">
            {topic.name}
          </h6>
          <small className=" italic font-medium">
            Created: {moment(topic.created).format("MMMM Do YYYY, h:mm:ss a")}
          </small>
        </div>
      ))}
    </div>
  );
};

export default Sidecard;
