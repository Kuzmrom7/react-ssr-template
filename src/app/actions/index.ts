import { ActionConsts } from "./../definitions/index";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = () => async dispatch => {
  dispatch({ type: ActionConsts.Home.USERS_REQUESTING });

  try {
    const { data } = await axios.get(`${API_URL}`);

    dispatch({ type: ActionConsts.Home.USERS_SUCCESS, data });
  } catch (err) {
    dispatch({
      type: ActionConsts.Home.USERS_FAILURE,
      err: err.message
    });
  }
};
