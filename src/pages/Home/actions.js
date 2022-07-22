import { FAILED, LOADING, SUCCESS } from './constants';
import { getUsers } from '../../utils/fetch';

export const getAllUsers = (value) => {
  const val = {
    gender: value.gender,
    page: value.page,
    search: value.search,
  };

  return (dispatch) => {
    dispatch(loadingAction(true));
    getUsers(val)
      .then((res) => {
        dispatch(successAction(res.data));
        dispatch(loadingAction(false));
      })
      .catch((err) => {
        dispatch(failedAction(err.message));
        dispatch(loadingAction(false));
      });
  };
};

const failedAction = (isLoading, message) => {
  return { type: FAILED, isLoading, message };
};

const loadingAction = (isLoading) => {
  return { type: LOADING, isLoading };
};
const successAction = (data) => {
  return { type: SUCCESS, data };
};
