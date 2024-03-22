import axios from 'axios'

const API_KEY = 'не использую ключ' // использовал этот ключ - pk_8cb29e968f6e49bf9297da6863dbe632

const fetchStockData = async (pageSize: number, page: number) => {
	const response = await axios.get(
		`https://api.iex.cloud/v1/data/core/stock_collection/tag?collectionName=Airlines&token=${API_KEY}`
	)

	const startIndex = (page - 1) * pageSize
	const endIndex = page * pageSize
	const paginatedData = response.data.slice(startIndex, endIndex)

	const totalPages = response.data.length

	return { paginatedData, totalPages }
}

export { fetchStockData }
