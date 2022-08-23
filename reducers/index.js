import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'

import group_manager from './group_manager'
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
  group_manager,
  date_checker,
  sidebar_toggler,
})

export default rootReducer
