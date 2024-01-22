import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export function getPosts(num) {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post`)
            .then((res) => {
                const array = res.data.slice(0, num);
                dispatch({ type: GET_POSTS, payload: array });
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

export const UPDATE_POST = "UPDATE_POST";
export function updatePost(postId, message) {
    return (dispatch) => {
        return axios
            .put(`${process.env.REACT_APP_API_URL}api/post/${postId}`, { message })
            .then((res) => {
                dispatch({ type: UPDATE_POST, payload: { postId, message } });
            })
            .catch((err) => console.log(err));
    };
};

export const DELETE_POST = "DELETE_POST";
export function deletePost(postId) {
    return (dispatch) => {
        return axios
            .delete(`${process.env.REACT_APP_API_URL}api/post/${postId}`)
            .then((res) => {
                dispatch({ type: DELETE_POST, payload: { postId } });
            })
            .catch((err) => console.log(err));
    };
};

export const ADD_COMMENT = "ADD_COMMENT";
export function addComment(postId, commenterId, text, commenterPseudo) {
    return (dispatch) => {
        return axios
            .patch(
                `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
                { commenterId, text, commenterPseudo }
            )
            .then((res) => {
                dispatch({ type: ADD_COMMENT, payload: { postId } });
            })
            .catch((err) => console.log(err));
    };
};

export const EDIT_COMMENT = "EDIT_COMMENT";
export function editComment(postId, commentId, text) {
    return (dispatch) => {
        return axios
            .patch(
                `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
                { commentId, text }
            )
            .then((res) => {
                dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
            })
            .catch((err) => console.log(err));
    };
};

export const DELETE_COMMENT = "DELETE_COMMENT";
export function deleteComment(postId, commentId) {
    return (dispatch) => {
        return axios
            .patch(
                `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
                { commentId }
            )
            .then((res) => {
                dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
            })
            .catch((err) => console.log(err));
    };
};