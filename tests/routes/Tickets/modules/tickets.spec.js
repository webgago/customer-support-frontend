// import fetchMock from 'fetch-mock'
import nock from 'nock'

import {
  LOAD_TICKETS_SUCCESS,
  LOAD_TICKETS_REQUEST,
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

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('creates LOAD_TICKETS_SUCCESS when fetching tickets has been done', () => {
      nock('http://localhost/')
        .post('/tickets/search')
        .reply(200, { tickets: [{ id: 1 }] })

      const expectedActions = [
        { type: LOAD_TICKETS_REQUEST },
        { type: LOAD_TICKETS_SUCCESS, tickets: [{ id: 1 }] }
      ]
      const store = mockStore({ tickets: [] })

      // return store.dispatch(actions.loadTickets())
      //   .then(() => { // return of async actions
      //     expect(store.getActions()).toEqual(expectedActions)
      //   })
      //   .catch((ex) => {
      //     console.log(ex)
      //   })
    })
  })

  // describe('(Reducer)', () => {
  //   it('Should be a function.', () => {
  //     expect(ticketsReducer).to.be.a('function')
  //   })
  //
  //   it('Should initialize with a state of [] (Array).', () => {
  //     expect(ticketsReducer(undefined, {})).to.be.instanceof(Array)
  //   })
  //
  //   it('Should return the previous state if an action was not matched.', () => {
  //     let state = ticketsReducer(undefined, {})
  //     expect(state).to.be.empty
  //     state = ticketsReducer(state, { type: '@@@@@@@' })
  //     expect(state).to.be.empty
  //     state = ticketsReducer(state, loadTicketsSuccess([1]))
  //     expect(state).to.have.members([1])
  //     state = ticketsReducer(state, { type: '@@@@@@@' })
  //     expect(state).to.have.members([1])
  //   })
  // })
  //
  // describe('(Action Creator) loadTicketsSuccess', () => {
  //   it('Should be exported as a function.', () => {
  //     expect(loadTicketsSuccess).to.be.a('function')
  //   })
  //
  //   it('Should return an action with type "LOAD_TICKETS_SUCCESS".', () => {
  //     expect(loadTicketsSuccess()).to.have.property('type', LOAD_TICKETS_SUCCESS)
  //   })
  //
  //   it('Should assign the first argument to the "payload" property.', () => {
  //     expect(loadTicketsSuccess([1])).to.have.property('payload').that.have.members([1])
  //   })
  //
  //   it('Should default the "payload" property to 1 if not provided.', () => {
  //     expect(loadTicketsSuccess()).to.have.property('payload').that.is.empty
  //   })
  // })
  //
  // describe('(Action Creator) loadTickets', () => {
  //   let _globalState
  //   let _dispatchSpy
  //   let _getStateSpy
  //
  //   afterEach(() => {
  //     fetchMock.restore()
  //   })
  //
  //   it('Should be exported as a function.', () => {
  //     expect(loadTickets).to.be.a('function')
  //   })
  //
  //   it('Should return a function (is a thunk).', () => {
  //     expect(loadTickets()).to.be.a('function')
  //   })
  //
  //   it('Should call dispatch and getState exactly once.', () => {
  //     fetchMock()
  //       .post('/tickets/search', {result: 'ok'})
  //
  //     console.log(store.dispatch)
  //     const expectedActions = [
  //       {}
  //     ]
  //     const store = mockStore({ tickets: [] })
  //     return store.dispatch(loadTickets())
  //       .then(() => { // return of async actions
  //         expect(store.getActions()).toEqual(expectedActions)
  //       })
  //   })
  //
  //   it('Should produce a state', () => {
  //     _globalState = { tickets: [1] }
  //
  //     return doubleAsync()(_dispatchSpy, _getStateSpy)
  //       .then(() => {
  //         _dispatchSpy.should.have.been.calledOnce
  //         _getStateSpy.should.have.been.calledOnce
  //         expect(_globalState.tickets).to.equal([2])
  //         return loadTickets()(_dispatchSpy, _getStateSpy)
  //       })
  //       .then(() => {
  //         _dispatchSpy.should.have.been.calledTwice
  //         _getStateSpy.should.have.been.calledTwice
  //         expect(_globalState.tickets).to.equal([3])
  //       })
  //   })
  // })
})
