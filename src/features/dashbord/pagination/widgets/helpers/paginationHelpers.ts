export const getPaginationButtons = (currentPage: number, totalPages: number) => {
    const getRange = (start: number, end: number) => {
        const range: number[] = [];
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    };

    // Initial and final pages
    const pages: (number | '...')[] = [1];

    // Determine the start and end range around the current page.
    const startRange = Math.max(2, currentPage - 2);
    const endRange = Math.min(totalPages - 1, currentPage + 2);

    // Add "..." or the range around the current page
    if (startRange > 2) pages.push('...');
    pages.push(...getRange(startRange, endRange));
    if (endRange < totalPages - 1) pages.push('...');

    // Push the last page if necessary
    if (totalPages > 1) pages.push(totalPages);

    return pages;
};
