import { List, Map } from 'immutable';
import oboe from 'oboe';
import Worker from './list.worker';

const ADD_ITEM = 'app/cube/ADD_ITEM';
const UPDATE_SORT = 'app/cube/UPDATE_SORT';
const UPDATE_FILTERS = 'app/cube/UPDATE_FILTERS';
const UPDATE_TOTAL = 'app/cube/UPDATE_TOTAL';
const UPDATE_RECORD = 'app/cube/UPDATE_RECORD';

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

const updateRecord = (record) => ({
    type: UPDATE_RECORD,
    payload: record
});

const generateList = () => {
    return dispatch => {
        oboe('http://localhost:3000/total')
            .done((res) => dispatch(updateTotal(res)))
            .fail(err => console.log(err));

        const worker = new Worker();
        worker.addEventListener('message', e => {
            const data = JSON.parse(e.data);
            dispatch(addItem(data.list));
        });
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
            id: '1',
            label: 'Name',
            field: 'name',
            type: 'text',
            value: '',
        }),
        Map({
            id: '2',
            label: 'Age',
            field: 'age',
            type: 'text',
            value: '',
        }),
        Map({
            id: '3',
            label: 'Date From',
            field: 'date',
            type: 'date',
            value: '',
        }),
        Map({
            id: '4',
            label: 'Random',
            field: 'random',
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
        case UPDATE_RECORD: {
            const { updateIndex, field, value } = action.payload;
            const list = state.get('list');
            const updated = list.set(updateIndex, Object.assign({}, list.get(updateIndex), { [field]: value }));
            return state.set('list', updated);
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
    updateRecord,
    cube,
    filters,
};