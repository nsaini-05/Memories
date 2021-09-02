import React, { useState, useEffect } from "react";
import useStyles from "./style";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const post = useSelector((state) =>
    currentId ? state.posts.find((post) => post._id === currentId) : null
  );

  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: {
      public_url: "",
      public_id: "",
    },
  });

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  /*Handling the file Input */
  const onChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPostData({
          ...postData,
          selectedFile: { public_url: reader.result },
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
      clear();
    } else {
      dispatch(createPost(postData));
      clear();
    }
  };

  return (
    <div class="form">
      <h2 class="secondary-heading">Create a Memory</h2>
      <form class="cta-form" type="submit" onSubmit={handleSubmit}>
        <div>
          <label for="creator">Created By</label>
          <input
            type="text"
            placeholder="Who took the picture?"
            value={postData.creator}
            id="creator"
            onChange={(e) => {
              setPostData({ ...postData, creator: e.target.value });
            }}
            required
          />
        </div>
        <div>
          <label for="title">Title</label>
          <input
            type="text"
            placeholder="What is it about?"
            id="Title"
            onChange={(e) => {
              setPostData({ ...postData, title: e.target.value });
            }}
            value={postData.title}
            required
          />
        </div>

        <div>
          <label for="title">Message</label>
          <input
            type="text"
            placeholder="What's the message behind?"
            id="Title"
            maxLength="30"
            required
            onChange={(e) => {
              setPostData({ ...postData, message: e.target.value });
            }}
            value={postData.message}
          />
        </div>

        <div>
          <label for="tags">Tags</label>
          <input
            type="text"
            placeholder="Relevant Tags"
            id="creator"
            onChange={(e) => {
              setPostData({ ...postData, tags: e.target.value.split(",") });
            }}
            value={postData.tags}
            required
          />
        </div>
        <div>
          <input
            type="file"
            id="file"
            name="image"
            onChange={onChange}
            accept="image/png, image/gif, image/jpeg"
          />
        </div>

        <button class="btn-submit">Submit</button>
      </form>

      {/* <img src={selectedFile} alt="|pre" /> */}
    </div>
  );
};

export default Form;
