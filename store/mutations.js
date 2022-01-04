import * as types from './mutation-types'

/**
 * Global mutations
 * @return {Object}
 */
export default {
  [types.UPDATE_LOADING](state, data) {
    state.isLoading = data
  },
  [types.SET_USER](state, data) {
    state.user = data
  },
}
