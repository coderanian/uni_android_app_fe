export function sortByAttribute(arr, attribute, sortOrder = 'asc') {
    if (!arr || !Array.isArray(arr) || arr.length === 0) {
        console.error('Ungültiges Array.');
        return [];
    }

    if (!attribute || typeof attribute !== 'string') {
        console.error('Ungültiges Attribut.');
        return arr;
    }

    const isAscending = sortOrder.toLowerCase() === 'asc';

    return arr.slice().sort((a, b) => {
        const valueA = a[attribute];
        const valueB = b[attribute];
        if (valueA === valueB) {
             return 0;
        }
        return isAscending ? (valueA < valueB ? -1 : 1) : (valueB < valueA ? -1 : 1);
    });
}