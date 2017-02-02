import fetchMock from 'fetch-mock'

import {
  LOAD_TICKET_SUCCESS,
  LOAD_TICKET_REQUEST,
  LOAD_TICKET_FAILURE,
  actions,
  default as ticketReducer
} from 'routes/Ticket/modules/ticket'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('(Redux Module) Ticket', () => {
  it('Should export a constant LOAD_TICKET_SUCCESS.', () => {
    expect(LOAD_TICKET_SUCCESS).to.equal('LOAD_TICKET_SUCCESS')
  })
  it('Should export a constant LOAD_TICKET_REQUEST.', () => {
    expect(LOAD_TICKET_REQUEST).to.equal('LOAD_TICKET_REQUEST')
  })
  it('Should export a constant LOAD_TICKET_FAILURE.', () => {
    expect(LOAD_TICKET_FAILURE).to.equal('LOAD_TICKET_FAILURE')
  })

  describe('(Action) loadTicket', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('creates LOAD_TICKET_SUCCESS when fetching tickets has been done', () => {
      fetchMock
        .get(/\/tickets\/1/, { body: { id: 1 } })

      const expectedActions = [
        { type: LOAD_TICKET_REQUEST },
        { type: LOAD_TICKET_SUCCESS, payload: { id: 1 } }
      ]
      const store = mockStore({ ticket: {} })

      return store.dispatch(actions.loadTicket(1))
        .then(() => {
          expect(store.getActions()).to.have.deep.members(expectedActions)
        })
    })

    it('creates LOAD_TICKET_FAILURE when fetching tickets throws error', () => {
      fetchMock
        .get(/\/tickets\/1/, 401)

      const expectedAction = {
        type: LOAD_TICKET_FAILURE, error: { errors: { base: ['Unauthorized'] }, unauthorized: true }
      }
      const store = mockStore({ tickets: [] })

      return store.dispatch(actions.loadTicket(1))
        .then(() => {
          let actions = store.getActions()
          expect(actions).to.deep.include.members([expectedAction])
        })
    })
  })

  describe('(Action) closeTicket', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('creates LOAD_TICKET_SUCCESS when fetching tickets has been done', () => {
      fetchMock
        .put(/\/tickets\/1\/close/, { body: { id: 1 } })

      const expectedActions = [
        { type: LOAD_TICKET_REQUEST },
        { type: LOAD_TICKET_SUCCESS, payload: { id: 1 } }
      ]
      const store = mockStore({ ticket: {} })

      return store.dispatch(actions.closeTicket(1))
        .then(() => {
          expect(store.getActions()).to.have.deep.members(expectedActions)
        })
    })

    it('creates LOAD_TICKET_FAILURE when fetching tickets throws error', () => {
      fetchMock
        .put(/\/tickets\/1\/close/, 401)

      const expectedAction = {
        type: LOAD_TICKET_FAILURE, error: { errors: { base: ['Unauthorized'] }, unauthorized: true }
      }
      const store = mockStore({ tickets: [] })

      return store.dispatch(actions.closeTicket(1))
        .then(() => {
          let actions = store.getActions()
          expect(actions).to.deep.include.members([expectedAction])
        })
    })
  })

  describe('(Action) reopenTicket', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('creates LOAD_TICKET_SUCCESS when fetching tickets has been done', () => {
      fetchMock
        .put(/\/tickets\/1\/reopen/, { body: { id: 1 } })

      const expectedActions = [
        { type: LOAD_TICKET_REQUEST },
        { type: LOAD_TICKET_SUCCESS, payload: { id: 1 } }
      ]
      const store = mockStore({ ticket: {} })

      return store.dispatch(actions.reopenTicket(1))
        .then(() => {
          expect(store.getActions()).to.have.deep.members(expectedActions)
        })
    })

    it('creates LOAD_TICKET_FAILURE when fetching tickets throws error', () => {
      fetchMock
        .put(/\/tickets\/1\/reopen/, 401)

      const expectedAction = {
        type: LOAD_TICKET_FAILURE, error: { errors: { base: ['Unauthorized'] }, unauthorized: true }
      }
      const store = mockStore({ tickets: [] })

      return store.dispatch(actions.reopenTicket(1))
        .then(() => {
          let actions = store.getActions()
          expect(actions).to.deep.include.members([expectedAction])
        })
    })
  })

  describe('(Reducer)', () => {
    it('returns initial state', () => {
      expect(ticketReducer(undefined, {})).to.deep.equal({ user: {} })
    })

    it('handles loadTicketSuccess', () => {
      expect(ticketReducer([], actions.loadTicketSuccess({ id: 1 }))).to.be.deep.eql({ id: 1 })
    })
  })
})
