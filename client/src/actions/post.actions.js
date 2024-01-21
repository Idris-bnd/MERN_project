import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export function getPosts() {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post`)
            .then((res) => {
                dispatch({ type: GET_POSTS, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const LIKE_POST = "LIKE_POST";
export function likePost(postId, userId) {
    return (dispatch) => {
        return axios
            .patch(`${process.env.REACT_APP_API_URL}api/post/like-post/${postId}`, { likerId: userId })
            .then((res) => {
                dispatch({ type: LIKE_POST, payload: { postId, userId } });
            })
            .catch((err) => console.log(err));
    };
};

export const UNLIKE_POST = "UNLIKE_POST";
export function unlikePost(postId, userId) {
    return (dispatch) => {
        return axios
            .patch(`${process.env.REACT_APP_API_URL}api/post/unlike-post/${postId}`, { likerId: userId })
            .then((res) => {
                dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
            })
            .catch((err) => console.log(err));
    };
};