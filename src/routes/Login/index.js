import LoginView from './components/LoginView'
import { shouldNotBeAuthorized } from '../../containers/Auth/validation'

export default (store) => ({
  path : 'login',
  onEnter: (nextState, replace) => {
    shouldNotBeAuthorized(store, nextState, replace)
  },
  component: LoginView
})

