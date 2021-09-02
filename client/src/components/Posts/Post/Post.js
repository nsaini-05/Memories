import React from "react";
import styled from "styled-components";
import { deletePost, likePost } from "../../../actions/posts";
import { useDispatch } from "react-redux";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();

  return (
    <div class="card">
      <img
        src={post.selectedFile ? post.selectedFile.public_url : ""}
        class="card-img"
      />
      <div class="card-content">
        {post.tags.length > 0 ? (
          post.tags.map((tag) => (
            <span class="tag">&nbsp;&nbsp;{`#${tag}`} </span>
          ))
        ) : (
          <></>
        )}
        <p class="card-title">{post.title}</p>
        <p class="card-description">{post.message}</p>
        <div class="card-icons">
          <div class="like">
            <button
              class="like-button"
              onClick={() => dispatch(likePost(post._id))}
            >
              <ion-icon
                name="thumbs-up-outline"
                class="card-icon card-icon-like"
              ></ion-icon>
            </button>
            <span class="card-icon-text">{post.likeCount}</span>
          </div>

          <div class="update">
            <button
              class="update-button"
              onClick={() => {
                setCurrentId(post._id);
              }}
            >
              <ion-icon
                name="create-outline"
                class="card-icon card-icon-update"
              ></ion-icon>
            </button>
          </div>

          <div>
            <button
              class="delete-button"
              onClick={() => dispatch(deletePost(post._id))}
            >
              <ion-icon
                name="trash-outline"
                class="card-icon card-icon-delete"
              ></ion-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
