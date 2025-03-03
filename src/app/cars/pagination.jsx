export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const renderPages = () => {
        let pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages = [1, 2, 3, '...', totalPages];
            } else if (currentPage >= totalPages - 2) {
                pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }

        return pages;
    };

    return (
        <div className="flex justify-center items-center mt-6 space-x-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg disabled:text-gray-400"
            >
                &lt;
            </button>

            {renderPages().map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    className={`px-4 py-2 rounded-lg ${currentPage === page ? "bg-black text-white" : "text-gray-500"}`}
                    disabled={page === '...'}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg disabled:text-gray-400"
            >
                &gt;
            </button>
        </div>
    );
};