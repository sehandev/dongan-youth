import { combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'

import class_checker from './class_checker'
import date_checker from './date_checker'
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
  class_checker,
  date_checker,
  sidebar_toggler,
})

export default rootReducer
