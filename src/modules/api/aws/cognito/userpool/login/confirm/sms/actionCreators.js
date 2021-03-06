import { AwsConfirmActions as AT } from './actionTypes';
import {
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';

import config from '../../../../../../../../config';

export function confirmRequest() {
  return {
    type: AT.CONFIRM_REQUEST
  };
}

export function confirmSuccess() {
  return {
    type: AT.CONFIRM_SUCCESS
  };
}

export function confirmFailure(error) {
  return {
    type: AT.CONFIRM_FAILURE,
    error: error
  };
}

export function resendRequest() {
  return {
    type: AT.RESEND_REQUEST
  };
}

export function resendSuccess() {
  return {
    type: AT.RESEND_SUCCESS
  };
}

export function resendFailure(error) {
  return {
    type: AT.RESEND_FAILURE,
    error: error
  };
}

/*
https://redux.js.org/docs/advanced/AsyncActions.html
 an action creator can return a function instead of an action object. 
 This way, the action creator becomes a thunk.
 When an action creator returns a function, that function will get executed by the Redux Thunk middleware. 
 This function doesn't need to be pure; it is thus allowed to have side effects, including executing asynchronous API calls. 
 The function can also dispatch actions—like those synchronous actions we defined earlier.
*/

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function confirm(email, confirmationCode) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return dispatch => {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(confirmRequest());

    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });

    const user = new CognitoUser({ Username: email, Pool: userPool });

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    // Do not use catch, because that will also catch
    // any errors in the dispatch and resulting render,
    // causing a loop of 'Unexpected batch number' errors.
    // https://github.com/facebook/react/issues/6895
    // return 1
    return new Promise((resolve, reject) =>
      user.confirmRegistration(confirmationCode, true, (err, result) => {
        if (err) {
          dispatch(confirmFailure(err.message));
          resolve(err.message);
          return;
        }
        dispatch(confirmSuccess());
        resolve('success');
      })
    );
  };
}

export function resend(email) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return dispatch => {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(resendRequest());

    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });

    const user = new CognitoUser({ Username: email, Pool: userPool });

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    // Do not use catch, because that will also catch
    // any errors in the dispatch and resulting render,
    // causing a loop of 'Unexpected batch number' errors.
    // https://github.com/facebook/react/issues/6895
    // return 1
    return new Promise((resolve, reject) =>
      user.resendConfirmationCode((err, result) => {
        if (err) {
          dispatch(resendFailure(err.message));
          resolve(err.message);
          return;
        }
        dispatch(resendSuccess());
        resolve('success');
      })
    );
  };
}
