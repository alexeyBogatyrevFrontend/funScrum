import { createSlice, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit'
import { fetchStockData } from '../../api/stockApi'

import { Stock } from '../../types'
import { RootState } from '../store'

export type StockState = {
	stocks: Stock[]
	loading: boolean
	error: string | null
	currentPage: number
	totalPages: number
}

const initialState: StockState = {
	stocks: [],
	loading: false,
	error: null,
	currentPage: 1,
	totalPages: 1,
}

const stockSlice = createSlice({
	name: 'stocks',
	initialState,
	reducers: {
		fetchStocksRequest(state) {
			state.loading = true
			state.error = null
		},
		fetchStocksSuccess(
			state,
			action: PayloadAction<{ paginatedData: Stock[]; totalPages: number }>
		) {
			state.loading = false
			state.stocks = action.payload.paginatedData
			state.totalPages = action.payload.totalPages
		},
		fetchStocksFailure(state, action: PayloadAction<string>) {
			state.loading = false
			state.error = action.payload
		},
		nextPage(state) {
			state.currentPage += 1
		},
		prevPage(state) {
			state.currentPage -= 1
		},
		moveStock(
			state,
			action: PayloadAction<{ startIndex: number; endIndex: number }>
		) {
			const { startIndex, endIndex } = action.payload
			const [removed] = state.stocks.splice(startIndex, 1)
			state.stocks.splice(endIndex, 0, removed)
		},
	},
})

export const {
	fetchStocksRequest,
	fetchStocksSuccess,
	fetchStocksFailure,
	nextPage,
	prevPage,
	moveStock,
} = stockSlice.actions

export const fetchStocks =
	(pageSize: number, page: number) =>
	async (dispatch: ThunkDispatch<RootState, void, any>) => {
		try {
			dispatch(fetchStocksRequest())
			const { paginatedData, totalPages } = await fetchStockData(pageSize, page)
			dispatch(fetchStocksSuccess({ paginatedData, totalPages }))
		} catch (error: any) {
			dispatch(fetchStocksFailure(error.toString()))
		}
	}

export default stockSlice
