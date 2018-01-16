import { createSelector } from 'reselect';

const filterRow = (filters = [], row = {}) => {
    return filters
            .reduce((arr, x) => {
                arr.push( row[ x.get('name') ].includes( x.get('value') ));
                return arr;
            }, [])
            .every(x => x);
};

const getList = (state) => state.get('cube').get('list');

const getFilters = (state) => state.get('filters');

const getFilteredList = createSelector(
    [getList, getFilters],
    (list, filters) => {
        const activeFilters = filters.filter(f => f);

        if (!activeFilters.size) {
            return list;
        }

        return list.filter((row) => filterRow(activeFilters , row));
    }
);

export {
    getFilteredList,
};