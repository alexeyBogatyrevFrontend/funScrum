import React from 'react'
import { Stock } from '../types'
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from 'react-beautiful-dnd'

import { useDispatch } from 'react-redux'
import { moveStock } from '../store/slices/stockSlice'

interface StockTableProps {
	stocks: Stock[]
	startIndex: number
}

const StockTable: React.FC<StockTableProps> = ({ stocks, startIndex }) => {
	const dispatch = useDispatch()

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return
		}

		const startIndex = result.source.index
		const endIndex = result.destination.index

		dispatch(moveStock({ startIndex, endIndex }))
	}

	return (
		<div className='table'>
			<table className='stock-table'>
				<thead>
					<tr>
						<th className='first'>#</th>
						<th>Company Name</th>
						<th>Symbol</th>
						<th>Latest Price</th>
						<th>Change Percent</th>
						<th>Market Cap</th>
						<th>P/E Ratio</th>
						<th>52 Week High</th>
						<th>52 Week Low</th>
						<th>YTD Change</th>
					</tr>
				</thead>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='stocks'>
						{provided => (
							<tbody ref={provided.innerRef} {...provided.droppableProps}>
								{stocks.map((stock, index) => (
									<Draggable
										key={index}
										draggableId={`stock-${index}`}
										index={index}
									>
										{provided => (
											<tr
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<td className='numbers'>
													<span>{startIndex + index}</span>
												</td>
												<td>
													<span
														title={stock.companyName ? stock.companyName : '-'}
													>
														{stock.companyName ? stock.companyName : '-'}
													</span>
												</td>
												<td>
													<span title={stock.symbol ? stock.symbol : '-'}>
														{stock.symbol ? stock.symbol : '-'}
													</span>
												</td>
												<td>
													<span>
														{stock.latestPrice ? stock.latestPrice : '-'}
													</span>
												</td>
												<td>
													<span>
														{stock.changePercent ? stock.changePercent : '-'}
													</span>
												</td>
												<td>
													<span>{stock.marketCap ? stock.marketCap : '-'}</span>
												</td>
												<td>
													<span>{stock.peRatio ? stock.peRatio : '-'}</span>
												</td>
												<td>
													<span>
														{stock.week52High ? stock.week52High : '-'}
													</span>
												</td>
												<td>
													<span>{stock.week52Low ? stock.week52Low : '-'}</span>
												</td>
												<td>
													<span>{stock.ytdChange ? stock.ytdChange : '-'}</span>
												</td>
											</tr>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</tbody>
						)}
					</Droppable>
				</DragDropContext>
			</table>
		</div>
	)
}

export default StockTable
