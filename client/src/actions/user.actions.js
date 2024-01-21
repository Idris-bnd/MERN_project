import axios from "axios";

export const GET_USER = "GET_USER";
export function getUser(uid) {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        console.log(res);
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export function uploadPicture(data, id) {
  console.log(data);
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        getUser(id);
      })
      .catch((err) => console.log(err));
  };
};

export const UPDATE_BIO = "UPDATE_BIO";
export function updateBio(userId, bio) {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/user/${userId}`, { bio })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};