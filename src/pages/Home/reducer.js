import { FAILED, LOADING, SUCCESS } from './constants';
import { getAllUsers } from './actions';

const initialState = {
  data: {},
  getAllUsers,
  isLoading: false,
  message: '',
};

export default function reducer(state = initialState, action = {}) {
  const { data, isLoading, message, type } = action;

  switch (type) {
    case FAILED:
      return {
        ...state,
        message,
      };

    case LOADING:
      return {
        ...state,
        isLoading,
      };

    case SUCCESS:
      return {
        ...state,
        data,
      };

    default:
      return state;
  }
}
