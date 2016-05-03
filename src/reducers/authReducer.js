import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function auth(state = {
    isAuthenticated: localStorage.getItem('id_token') ? true : false,
    idToken: '',
    userProfile: {}
  }, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        errorMessage: '',
        idToken: action.idToken,
        userProfile: action.userProfile
      })
    default:
      return state
  }
}
