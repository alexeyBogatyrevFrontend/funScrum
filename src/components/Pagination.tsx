import React from 'react'

interface PaginationProps {
	currentPage: number
	totalPages: number
	onNextPage: () => void
	onPrevPage: () => void
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onNextPage,
	onPrevPage,
}) => {
	return (
		<div className='pagination-container'>
			<button
				className='pagination-button'
				onClick={onPrevPage}
				disabled={currentPage === 1}
			>
				Prev
			</button>
			<span className='pagination-info'>
				{currentPage} of {totalPages}
			</span>
			<button
				className='pagination-button'
				onClick={onNextPage}
				disabled={currentPage === totalPages}
			>
				Next
			</button>
		</div>
	)
}

export default Pagination
