import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import api from "../api";

const CreateBlogPage = () => {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  // const [author, setAuthor] = useState("author");
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const { data: topics, isLoading } = useFetch(
    "http://localhost:8000/api/topic-list/"
  );

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
      const res = await api.post("blog-create/", { topic: { name }, body });
      console.log(res);
      if (res.status == 201 && body && name) {
        navigate("/");
      } else {
        throw Error("There was an error while submiting the data");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center px-12 ">
      <div className="flex rounded-3xl items-center justify-center max-w-[1640px] drop-shadow-2xl bg-white">
        <div className="px-2 hidden lg:block md:w1/2 rounded-3xl">
          <img className="w-[600px] h-[600px]" src="/img/login.jpg" alt="" />
        </div>
        <div className="w-full space-y-12 m-6 md:space-y-2 lg:w-1/2">
          <form onSubmit={prevSubmit}>
            <center>
              <h1 className="text-2xl font-semibold text-primary-600">
                Create blog
              </h1>
            </center>
            <label
              htmlFor="topic"
              className="italic font-medium text-xl ml-auto"
            >
              Topic
            </label>
            <div className="flex items-center  shadow font-light w-full rounded-e-sm mt-2">
              <input
                type="text"
                required
                name="Topic"
                list="topics"
                placeholder="Enter a blog topic..."
                className="input "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              placeholder="create your blog..."
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
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPage;
