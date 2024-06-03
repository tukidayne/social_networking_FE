/* eslint-disable no-unused-expressions */
import * as Types from "../constants/ActionTypes";

let initialState = [];

const Post = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_POST:
      const data = action.data;
      state = data;
      return state;
    case Types.GET_DETAILS_POST:
      const dataDetailsPost = action.data;
      const typePost = action.typePost;
      if (typePost === "postById") {
        
      } else {
        const objIndex = state.findIndex(
          (obj) => obj?.id_post === dataDetailsPost[0]?.id_post
        );
        state[objIndex].likes = dataDetailsPost[0]?.likes;
      }
      return [...state];
    case Types.GET_DETAILS_POST_COMMENT:
      const dataPostComment = action.data;
      const objComment = state.findIndex(
        (obj) => obj.id_post === dataPostComment[0]?.id_post
      );
      state[objComment].comments = dataPostComment[0]?.comments;
      return [...state];
    default:
      return state;
  }
};

export default Post;
