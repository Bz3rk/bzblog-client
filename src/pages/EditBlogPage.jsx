import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { FaCircleNotch } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../api";

const EditBlogPage = () => {
  const { data: topics, isLoading } = useFetch(
    "http://localhost:8000/api/topic-list/"
  );

  const params = useParams();
  const customId = "custom-id-yes2";

  useEffect(() => {
    handleFetchPost();
  }, []);

  const handleFetchPost = async () => {
    try {
      const res = await api.get(`blog-detail/ ${params.id}`);
      const data = res.data;

      setTopic(data.topic);
      setBody(data.body);
    } catch (error) {
      toast.error(`blog not found`, {
        position: "top-center",
        toastId: customId,
        draggablePercent: 60,
      });
    }
  };

  const [topic, setTopic] = useState();
  const [body, setBody] = useState();

  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const prevSubmit = (e) => {
    e.preventDefault();
  };

  const handleBoldClick = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const textBefore = body.substring(0, start);
    const selectedText = body.substring(start, end);
    const textAfter = body.substring(end);

    // Check if the selected text is already bold
    if (selectedText.startsWith("*") && selectedText.endsWith("*")) {
      // Remove bold formatting
      setBody(
        `${textBefore}${selectedText.substring(
          1,
          selectedText.length - 1
        )}${textAfter}`
      );
    } else {
      // Add bold formatting
      setBody(`${textBefore}*${selectedText}*${textAfter}`);
    }
  };

  const handleSubmit = async () => {
    try {
      const name = topic.name;

      const res = await api.put(`blog-update/${params.id}`, {
        topic: { name },
        body,
      });

      if (res.status === 200 && body && name) {
        navigate("/blog/" + params.id);
      } else {
        throw Error("There was an error while submitting the data");
      }
    } catch (error) {
      // console.log(error.response.data); // Log the error message for debugging
      toast.error(`Error: ${error.message}`, {
        position: "top-center",
        toastId: customId,
        draggablePercent: 60,
      });
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
        <div className="flex min-h-screen justify-center items-center px-12 ">
          <div className="flex rounded-3xl items-center justify-center max-w-[1640px] drop-shadow-2xl bg-white">
            <div className="px-2 hidden lg:block md:w1/2 rounded-3xl">
              <img
                className="w-[600px] h-[600px]"
                src="/img/login.jpg"
                alt=""
              />
            </div>
            <div className="w-full space-y-12 m-6 md:space-y-2 lg:w-1/2">
              <form onSubmit={prevSubmit}>
                <center>
                  <h1 className="text-2xl font-semibold text-primary-600">
                    Edit Blog
                  </h1>
                </center>
                <label
                  htmlFor="topic"
                  className="italic font-medium text-xl ml-auto"
                >
                  Topic
                </label>
                <div className="flex items-center  shadow font-light w-full rounded-e-sm mt-2">
                  {topic && (
                    <input
                      type="text"
                      required
                      name="Topic"
                      list="topics"
                      placeholder="Enter a blog topic..."
                      className="input "
                      value={topic.name}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  )}

                  <datalist id="topics">
                    {topics.map((topic) => (
                      <option key={topic.id}>{topic.name}</option>
                    ))}
                  </datalist>
                </div>

                <label htmlFor="body" className="italic font-medium text-xl">
                  Blog
                </label>
                <div className="flex items-center  shadow font-light pr-4 w-full rounded-e-sm mt-2"></div>
                <textarea
                  name="body"
                  cols="50"
                  rows="5"
                  ref={textareaRef}
                  placeholder="Edit your blog..."
                  className="input drop-shadow resize-none"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <button
                  type="button"
                  onClick={handleBoldClick}
                  className="bg-primary-600 rounded-sm p-1 text-white font-sans font-medium italic mt-2"
                >
                  Bold
                </button>
                <div />
                <button
                  onClick={handleSubmit}
                  className="bg-primary-600 rounded-sm p-1 text-white w-full font-sans font-medium italic mt-2"
                >
                  Edit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBlogPage;
