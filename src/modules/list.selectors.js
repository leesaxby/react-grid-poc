import { createSelector } from 'reselect';


const filterStr = (filter, row) => {
    return row[ filter.get('field') ].includes( filter.get('value') );
};

const filterDate = (filter, row) => {
    if (filter.get('label') === 'Date From') {
        return new Date(row[ filter.get('field') ]).getTime() > new Date(filter.get('value')).getTime();
    }

    return new Date(row[ filter.get('field') ]).getTime() < new Date(filter.get('value')).getTime();
};

const filterRow = (filters = [], row = {}) => {
    return filters
            .reduce((arr, filter) => {
                switch (filter.get('type')) {
                    case 'date':
                        arr.push( filterDate(filter, row) );
                        break;
                    default:
                        arr.push( filterStr(filter, row) );
                        break;
                }

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