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

    /**
     * Sonderlösung für Sortierung nach Preis, da erst nach Preistype und danach nach Preis sortiert werden muss
     */
    if (attribute === 'price') {
        return arr.slice().sort((a, b) => {
            let comparison = 0;

            if (a.priceType < b.priceType) {
                comparison = -1
            } else if (a.priceType > b.priceType) {
                comparison = 1;
            }
            comparison = isAscending ? comparison : -comparison;

            if (comparison === 0) {
                // Konvertiere die Strings in Zahlen, falls sie Zahlen sind
                const numberA = isNaN(a.price) ? 0 : parseFloat(a.price);
                const numberB = isNaN(b.price) ? 0 : parseFloat(b.price);

                if (numberA < numberB) {
                    comparison = -1;
                } else if (numberA > numberB) {
                    comparison = 1
                }
                comparison = isAscending ? comparison : -comparison;
            }
            return comparison;
        });
    }

    return arr.slice().sort((a, b) => {
        const valueA = a[attribute];
        const valueB = b[attribute];
        if (valueA === valueB) {
             return 0;
        }
        return isAscending ? (valueA < valueB ? -1 : 1) : (valueB < valueA ? -1 : 1);
    });
}