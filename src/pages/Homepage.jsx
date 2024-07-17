import React from "react";
import Blogs from "../components/Blogs";
import { useState, useEffect } from "react";
import { FaCircleNotch } from "react-icons/fa";
import api from "../api";
import { useUser } from "../UserContext";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Homepage = () => {
  const [blogs, setBlogs] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  const customId = "custom-id-yes";
  const customId2 = "custom-id-yes2";

  useEffect(() => {
    handleFetchPost();
    handleFetchTopics();
    
  }, []);

  const handleFetchPost = async () => {
    try {
      const res = await api.get("blog-list/");
      const data = res.data;
      setBlogs(data);
    } catch (error) {
      toast.error(`${error.message} while getting blogs`, {
        position: "top-center",
        toastId: customId,
        draggablePercent: 60,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleFetchTopics = async () => {
    try {
      const res = await api.get("topic-list/");
      const data = res.data;
      setTopics(data);
    } catch (error) {
      toast.error(`${error.message} while getting topics`, {
        position: "top-center",
        toastId: customId2,
        draggablePercent: 60,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <center>
          <div className="my-[200px] mx-auto">
            <FaCircleNotch className="  animate-spin w-20 h-20 text-primary-600 " />
          </div>
        </center>
      ) : (
        <Blogs blogs={blogs} topics={topics} />
      )}
    </>
  );
};

export default Homepage;
