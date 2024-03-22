import { Provider } from 'react-redux'
import store from './store/store'
import StockListContainer from './containers/StockListContainer'

import './App.css'

const App = () => {
	return (
		<Provider store={store}>
			<div className='container'>
				<h1>Stock Tracker App</h1>
				<StockListContainer />
			</div>
		</Provider>
	)
}

export default App
