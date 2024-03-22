import { configureStore } from '@reduxjs/toolkit'
import stockSlice, { StockState } from './slices/stockSlice'

export type RootState = {
	stocks: StockState
}

const store = configureStore({
	reducer: {
		stocks: stockSlice.reducer,
	},
})

export default store
