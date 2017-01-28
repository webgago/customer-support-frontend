import HomeView from './components/HomeView'
import { isLoggedIn } from '../../containers/Auth/validation'

// Sync route definition
export default (store) => ({
  component: HomeView,
  onEnter: (nextState, replace) => {
    if (isLoggedIn(store)) {
      replace('/tickets')
    }
  }
})
