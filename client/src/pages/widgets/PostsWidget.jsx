import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const isLoading = useSelector(state => state.isLoading)
  const getPosts = async () => {
    dispatch(setLoading(true))
    const response = await fetch("https://socialgram-server.onrender.com/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (data) {
      dispatch(setPosts({ posts: data }));
      dispatch(setLoading(false));
    }
  };

  const getUserPosts = async () => {
    dispatch(setLoading(true));
    const response = await fetch(
      `https://socialgram-server.onrender.com/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    if (data) {
      dispatch(setPosts({ posts: data }));
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (!posts.length && isProfile) {
    return (
      <Box alignItems={'center'} flexDirection={'column'} display={'flex'}>
        <Box component="img" sx={{ width: "400px" }} src="../assets/box.svg" />
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ m: "1.5rem" }}>This user has not posted any thing</Typography>
      </Box>)
  }
  return (
    <>
      {isLoading ? <Box>
       <Skeleton animation="wave" /> 
       <Skeleton animation="wave" /> 
       <Skeleton animation="wave" /> 
       <Skeleton animation="wave" /> 
       <Skeleton animation="wave" /> 
       </Box>:
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
    </>
  );
};

export default PostsWidget;
