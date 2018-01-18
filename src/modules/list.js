import { List, Map } from 'immutable';
import Worker from './list.worker';

const ADD_ITEM = 'app/cube/ADD_ITEM';
const UPDATE_SORT = 'app/cube/UPDATE_SORT';
const UPDATE_FILTERS = 'app/cube/UPDATE_FILTERS';

const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item
});

const generateList = () => {
    return dispatch => {
        const worker = new Worker();
        worker.addEventListener('message', e => dispatch(addItem(e.data.list)));
    };
};

const updateSort = (sort) => ({
    type: UPDATE_SORT,
    payload: sort
});

const updateFilters = (filters) => ({
    type: UPDATE_FILTERS,
    payload: filters
});

const initialCubeState = Map({
    list: List(),
    sort: Map({ sortBy: '', sortDirection: ''}),
});

const initialFilterState = List([
        Map({
            name: 'name',
            type: 'text',
            value: '',
        }),
        Map({
            name: 'age',
            type: 'text',
            value: '',
        }),
        Map({
            name: 'date',
            type: 'date',
            value: '',
        }),
        Map({
            name: 'random',
            type: 'text',
            value: '',
        }),
]);

const cube = (state = initialCubeState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return state.set('list', state.get('list').concat(action.payload));
        case UPDATE_SORT: {
            const sort = state.get('sort');
            const sortDirection = sort.get('sortDirection') === 'DESC' ? 'ASC' : 'DESC';

            return state.set('sort',
                Map( Object.assign({}, action.payload, { sortDirection }) )
            );
        }
        default:
            return state;
    }
};

const filters = (state = initialFilterState, action) => {
    switch (action.type) {
        case UPDATE_FILTERS: {
            const index = state.findIndex(filter => {
                return filter.get('name') === action.payload.get('name');
            });

            return state.set(index, action.payload);
        }
        default:
            return state;
    }
};

export {
    ADD_ITEM,
    UPDATE_SORT,
    UPDATE_FILTERS,
    addItem,
    generateList,
    updateSort,
    updateFilters,
    cube,
    filters,
};