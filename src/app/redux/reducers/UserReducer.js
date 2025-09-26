import { SET_USER_DATA, REMOVE_USER_DATA } from "../actions/UserActions";

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.data
      };
    }
    case REMOVE_USER_DATA: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
