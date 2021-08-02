import { SET_AUTHENTICATION_STATUS } from '../actions';

const initState = {
  isSignedIn: false,
};

export default (
  state = initState,
  action: { type: string; payload: any }
): typeof initState => {
  const { type, payload } = action;

  switch (type) {
    case SET_AUTHENTICATION_STATUS: {
      return {
        ...state,
        isSignedIn: payload.isSignedIn,
      };
    }
    default:
      return state;
  }
};
