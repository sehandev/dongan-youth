import { combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'

import class_checker from './class_checker'
import sidebar_toggler from './sidebar_toggler'

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return {
          ...state,
          ...action.payload,
        }

      default:
        return state
    }
  },
  sidebar_toggler,
  class_checker,
})

export default rootReducer
