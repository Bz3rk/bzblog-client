import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidecard from "../components/Sidecard";
import { FaTimes, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaCircleNotch } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../api";
import { useUser } from "../UserContext";

// blog detail page

const BlogDetailPage = () => {
  const [blog, setBlog] = useState(null);
  const [topics, setTopics] = useState([]);
  const [author, setAuthor] = useState([]);
  console.log(author);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const customId = "custom-id-yes";
  const customId2 = "custom-id-yes2";

  useEffect(() => {
    handleFetchBlog();
    handleFetchTopics();
  }, []);

  const handleFetchBlog = async () => {
    try {
      const res = await api.get(`blog-detail/${params.id}`);
      const data = res.data;
      setAuthor(data.author.email);
      setBlog(data);
    } catch (error) {
      toast.error(`${error.message} while getting blog`, {
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

  // This render the paragraphs and bolded part of the blog
  const renderParagraphs = (text) => {
    return text.split("\n").map((paragraph, index) => {
      const segments = paragraph.split("*");
      return (
        <p key={index} className="mb-2">
          {segments.map((segment, idx) => {
            if (idx % 2 === 0) {
              return segment; // Normal text
            } else {
              return <strong key={idx}>{segment}</strong>; // Bold text
            }
          })}
        </p>
      );
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`blog-delete/${id}`);
      console.log(res.status);

      navigate("/");
      // if (res.status === 200) {
      // } else {
      //   console.error(
      //     `Failed to delete blog post with id ${id}: ${res.statusText}`
      //   );
      // }
    } catch (error) {
      console.log(error.message);
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
        <div className="md:grid md:grid-cols-6 gap-4 mx-4 md:mx-16 mt-5">
          {blog && (
            <div className="col col-span-4 ">
              <div className="flex justify-between items-center">
                {blog.author && (
                  <p className=" italic text-primary-400 font-semibold text-2xl">
                    by <span>{blog.author.email}</span>
                  </p>
                )}
                {user === author && (
                  <div className="flex justify-between items-center gap-4">
                    <Link to={`/edit-blog/${blog.id}`}>
                      <FaEdit className="w-10 h-5 text-primary-600 " />
                    </Link>
                    <button
                      onClick={() => {
                        handleDelete(blog.id);
                      }}
                    >
                      <FaTimes className="w-10 h-5 text-primary-600 " />
                    </button>
                  </div>
                )}
              </div>
              {blog.topic && (
                <div className="text-4xl font-semibold ">{blog.topic.name}</div>
              )}
              <div className=" text-lg">{renderParagraphs(blog.body)}</div>
            </div>
          )}
          {setTopics && <Sidecard topics={topics} />}
        </div>
      )}
    </>
  );
};

export default BlogDetailPage;
