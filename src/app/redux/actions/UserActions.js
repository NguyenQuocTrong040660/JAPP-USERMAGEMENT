export const SET_USER_DATA = "USER_SET_DATA";
export const REMOVE_USER_DATA = "USER_REMOVE_DATA";

export function setUserData(user) {
  return dispatch => {
    dispatch({
      type: SET_USER_DATA,
      data: user
    });
  };
}

export function removeUserData() {
  return dispatch => {
    dispatch({
      type: REMOVE_USER_DATA
    });
  };
}
