import React, { useEffect } from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { CardMedia, CircularProgress } from "@material-ui/core";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

const Grid = styled.div`
  display: grid;
  grid-row-gap: 9.6rem;
  grid-column-gap: 6.4rem;
  grid-template-columns: repeat(2, 1fr);
`;




const Posts = ({ setCurrentId }) => {


  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  
  return posts ? (
    <div className="photos">
      {posts.map((post) => (
        <Post post={post} key={post._id} setCurrentId={setCurrentId} />
      ))}
    </div>
  ) : (
    <CircularProgress />
  );
};

export default Posts;
