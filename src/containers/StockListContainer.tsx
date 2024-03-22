import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import StockTable from '../components/StockTable'
import {
	StockState,
	fetchStocks,
	nextPage,
	prevPage,
} from '../store/slices/stockSlice'
import Pagination from '../components/Pagination'
import Loading from '../components/Loading'

const StockListContainer = () => {
	const dispatch = useDispatch()
	const { stocks, loading, error, totalPages, currentPage } = useSelector(
		(state: { stocks: StockState }) => state.stocks
	)

	const pageSize = 10
	const startIndex = (currentPage - 1) * pageSize + 1

	useEffect(() => {
		// @ts-expect-error some ts problem
		dispatch(fetchStocks(pageSize, 1))
	}, [dispatch])

	const handleNextPage = () => {
		dispatch(nextPage())
		// @ts-expect-error some ts problem
		dispatch(fetchStocks(pageSize, currentPage))
	}

	const handlePrevPage = () => {
		dispatch(prevPage())
		// @ts-expect-error some ts problem
		dispatch(fetchStocks(pageSize, currentPage))
	}

	if (loading) return <Loading />
	if (error) return <p>Error: {error}</p>

	const pages = Math.ceil(totalPages / pageSize)

	return (
		<div>
			<StockTable stocks={stocks} startIndex={startIndex} />
			<Pagination
				currentPage={currentPage}
				totalPages={pages}
				onNextPage={handleNextPage}
				onPrevPage={handlePrevPage}
			/>
		</div>
	)
}

export default StockListContainer
