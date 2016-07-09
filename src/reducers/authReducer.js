import { LOGIN_SUCCESS, LOGOUT_USER } from '../actions'

export default function auth(state = {
    isAuthenticated: localStorage.getItem('id_token') ? true : false,
    idToken: '',
    userProfile: null
  }, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        errorMessage: '',
        idToken: action.idToken,
        userProfile: action.userProfile
      });

    case LOGOUT_USER:
      return Object.assign({}, state, {
        isAuthenticated: false,
        idToken: action.idToken,
        userProfile: action.userProfile
      })
    default:
      return state
  }
}
