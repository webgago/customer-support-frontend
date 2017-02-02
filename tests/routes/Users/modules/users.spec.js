import fetchMock from 'fetch-mock'

import {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_REQUEST,
  LOAD_USERS_FAILURE,
  actions,
  default as usersReducer
} from 'routes/Users/modules/users'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('(Redux Module) Users', () => {
  it('Should export a constant LOAD_USERS_SUCCESS.', () => {
    expect(LOAD_USERS_SUCCESS).to.equal('LOAD_USERS_SUCCESS')
  })
  it('Should export a constant LOAD_USERS_REQUEST.', () => {
    expect(LOAD_USERS_REQUEST).to.equal('LOAD_USERS_REQUEST')
  })
  it('Should export a constant LOAD_USERS_FAILURE.', () => {
    expect(LOAD_USERS_FAILURE).to.equal('LOAD_USERS_FAILURE')
  })

  describe('(Action) loadUsers', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('creates LOAD_USERS_SUCCESS when fetching users has been done', () => {
      fetchMock
        .post(/\/users\/search/, { body: { users: [{ id: 1 }] } })

      const expectedActions = [
        { type: LOAD_USERS_REQUEST },
        { type: LOAD_USERS_SUCCESS, payload: { users: [{ id: 1 }] } }
      ]
      const store = mockStore({ users: [] })

      return store.dispatch(actions.loadUsers())
        .then(() => {
          expect(store.getActions()).to.have.deep.members(expectedActions)
        })
    })

    it('creates LOAD_USERS_FAILURE when fetching users throws error', () => {
      fetchMock
        .post(/\/users\/search/, 401)

      const expectedAction = {
        type: LOAD_USERS_FAILURE, error: { errors: { base: ['Unauthorized'] }, unauthorized: true }
      }
      const store = mockStore({ users: [] })

      return store.dispatch(actions.loadUsers())
        .then(() => { // return of async actions
          let actions = store.getActions()
          expect(actions).to.deep.include.members([expectedAction])
        })
    })
  })

  describe('(Reducer)', () => {
    it('returns initial state', () => {
      expect(usersReducer(undefined, {})).to
        .be.instanceof(Array)
        .and.be.empty
    })

    it('handles loadUsersSuccess', () => {
      expect(usersReducer([], actions.loadUsersSuccess([1]))).to.be.deep.eql([1])
    })
  })
})

