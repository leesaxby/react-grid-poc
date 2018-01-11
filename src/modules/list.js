import { List, Map } from 'immutable';
import { generateRandomList } from '../utils';

const GET_LIST = 'app/cube/GET_LIST';
const GET_LIST_SUCCESS = 'app/cube/GET_LIST_SUCCESS';
const UPDATE_SORT = 'app/cube/UPDATE_SORT';
const UPDATE_FILTERS = 'app/cube/UPDATE_FILTERS';

const getListSuccess = () => ({
    type: GET_LIST_SUCCESS,
    payload: generateRandomList()
});

const getList = () => getListSuccess();

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
    sort: Map({ sortBy: 'index', sortDirection: 'ASC'}),
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
        case GET_LIST_SUCCESS:
            return state.set('list', List(action.payload));
        case UPDATE_SORT:
            return state.set('sort', Map(action.payload));
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
    GET_LIST,
    GET_LIST_SUCCESS,
    UPDATE_SORT,
    UPDATE_FILTERS,
    getList,
    updateSort,
    updateFilters,
    cube,
    filters,
};