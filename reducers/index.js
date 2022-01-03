import { combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'

import class_checker from './class_checker'

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    }
  }
  return combineReducers({
    class_checker,
  })(state, action)
}
export default reducer
