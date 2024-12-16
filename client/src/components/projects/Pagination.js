import React from "react";

const Pagination = ({ currentPage, totalItems, pageSize, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    const handlePrevious = () => {
    /**
    * Handles moving to the previous page functionality.
    */
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
    /**
    * Handles moving to the next page functionality.
    */
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div>
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
