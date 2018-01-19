import { List, Map } from 'immutable';
import oboe from 'oboe';
import Worker from './list.worker';

const ADD_ITEM = 'app/cube/ADD_ITEM';
const UPDATE_SORT = 'app/cube/UPDATE_SORT';
const UPDATE_FILTERS = 'app/cube/UPDATE_FILTERS';
const UPDATE_TOTAL = 'app/cube/UPDATE_TOTAL';

const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item
});

const updateTotal = (total) => ({
    type: UPDATE_TOTAL,
    payload: total
});

const updateSort = (sort) => ({
    type: UPDATE_SORT,
    payload: sort
});

const updateFilters = (filters) => ({
    type: UPDATE_FILTERS,
    payload: filters
});

const generateList = () => {
    return dispatch => {
        oboe('http://localhost:3000/total')
            .done((res) => dispatch(updateTotal(res)))
            .fail(err => console.log(err));

        const worker = new Worker();
        worker.addEventListener('message', e => dispatch(addItem(e.data.list)));
    };
};

const initialCubeState = Map({
    list: List(),
    status: Map({
        total: 0
    }),
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
        case UPDATE_TOTAL:
            return state.set('status',
                Map( Object.assign({}, action.payload) )
            );
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