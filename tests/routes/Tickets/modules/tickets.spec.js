import fetchMock from 'fetch-mock'

import {
  LOAD_TICKETS_SUCCESS,
  LOAD_TICKETS_REQUEST,
  LOAD_TICKETS_FAILURE,
  actions,
  default as ticketsReducer
} from 'routes/Tickets/modules/tickets'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('(Redux Module) Tickets', () => {
  it('Should export a constant LOAD_TICKETS_SUCCESS.', () => {
    expect(LOAD_TICKETS_SUCCESS).to.equal('LOAD_TICKETS_SUCCESS')
  })
  it('Should export a constant LOAD_TICKETS_REQUEST.', () => {
    expect(LOAD_TICKETS_REQUEST).to.equal('LOAD_TICKETS_REQUEST')
  })
  it('Should export a constant LOAD_TICKETS_FAILURE.', () => {
    expect(LOAD_TICKETS_FAILURE).to.equal('LOAD_TICKETS_FAILURE')
  })

  describe('(Action) loadTickets', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('creates LOAD_TICKETS_SUCCESS when fetching tickets has been done', () => {
      fetchMock
        .post(/\/tickets\/search/, { body: { tickets: [{ id: 1 }] } })

      const expectedActions = [
        { type: LOAD_TICKETS_REQUEST },
        { type: LOAD_TICKETS_SUCCESS, payload: { tickets: [{ id: 1 }] } }
      ]
      const store = mockStore({ tickets: [] })

      return store.dispatch(actions.loadTickets())
        .then(() => {
          expect(store.getActions()).to.have.deep.members(expectedActions)
        })
    })

    it('creates LOAD_TICKETS_FAILURE when fetching tickets throws error', () => {
      fetchMock
        .post(/\/tickets\/search/, 401)

      const expectedAction = {
        type: LOAD_TICKETS_FAILURE, error: { errors: { base: ['Unauthorized'] }, unauthorized: true }
      }
      const store = mockStore({ tickets: [] })

      return store.dispatch(actions.loadTickets())
        .then(() => { // return of async actions
          let actions = store.getActions()

          expect(actions).to.deep.include.members([expectedAction])
        })
    })
  })

  describe('(Reducer)', () => {
    it('returns initial state', () => {
      expect(ticketsReducer(undefined, {})).to
        .be.instanceof(Array)
        .and.be.empty
    })

    it('handles loadTicketsSuccess', () => {
      expect(ticketsReducer([], actions.loadTicketsSuccess([1]))).to.be.deep.eql([1])
    })
  })
})
