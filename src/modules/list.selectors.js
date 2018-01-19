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

const getSort = (state) => state.get('cube').get('sort');

const getFilters = (state) => state.get('filters');

const getFilteredList = createSelector(
    [getList, getFilters],
    (list, filters) => {
        const activeFilters = filters.filter(f => f.get('value'));
        return !activeFilters.size ? list : list.filter((row) => filterRow(activeFilters , row));
    }
);

const getSortedList = createSelector(
    [getSort, getFilteredList],
    (sort, filteredList) => {
        const sortBy = sort.get('sortBy');
        const sortDirection = sort.get('sortDirection');

        // Initial sort state is blank to avoid sorting when initialy
        // importing data.
        if (!sortBy || !sortDirection) {
            return filteredList;
        }

        return filteredList.sortBy(item => item[sortBy])
                   .update(
                       list => (sortDirection === 'DESC' ? list.reverse() : list),
                   );
    }
);

export {
    getFilteredList,
    getSortedList,
};