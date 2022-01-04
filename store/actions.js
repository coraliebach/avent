import * as types from './mutation-types'

export default {
  setLoading(store, isLoading) {
    if (typeof isLoading !== 'boolean') {
      return store
    }

    store.commit(types.UPDATE_LOADING, isLoading)

    return store
  },

  login(store, { name, password }) {
    if (!name || !password) {
      return false
    }

    const users = process.env.USERS
    if (!users) {
      return false
    }

    const result = users.find((user) => user.name === name && user.passwd === password)
    if (!result) {
      return false
    }

    store.commit(types.SET_USER, result)
    return true
  },
}
