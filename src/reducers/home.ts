import { ActionConsts } from "./../definitions/index";

const initialState = {
  readyStatus: "invalid",
  err: null,
  list: []
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionConsts.Home.USERS_REQUESTING:
      return {
        ...state,
        readyStatus: "request"
      };
    case ActionConsts.Home.USERS_SUCCESS:
      return {
        ...state,
        readyStatus: "success",
        list: action.data
      };
    case ActionConsts.Home.USERS_FAILURE:
      return {
        ...state,
        readyStatus: "failure",
        err: action.err
      };
    default:
      return state;
  }
};
