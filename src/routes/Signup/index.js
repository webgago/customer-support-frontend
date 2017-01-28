import SignupView from './components/SignupView'
import { shouldNotBeAuthorized } from '../../containers/Auth/validation'

export default (store) => ({
  path : 'signup',
  onEnter: (nextState, replace) => {
    shouldNotBeAuthorized(store, nextState, replace)
  },
  component: SignupView
})

