import { List, Map } from 'immutable';

const GENERATE_LIST = 'app/cube/GENERATE_LIST';
const GENERATE_LIST_SUCCESS = 'app/cube/GENERATE_LIST_SUCCESS';
const UPDATE_SORT = 'app/cube/UPDATE_SORT';
const UPDATE_FILTERS = 'app/cube/UPDATE_FILTERS';

const generateListSuccess = (list) => ({
    type: GENERATE_LIST_SUCCESS,
    payload: list
});

const generateList = () => {
    return dispatch => {
        fetch('http://localhost:3000')
            .then(res => res.json())
            .then(list => dispatch(generateListSuccess(list)))
            .catch(err => console.log(err));
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
        case GENERATE_LIST_SUCCESS:
            return state.set('list', List(action.payload));
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
    GENERATE_LIST,
    GENERATE_LIST_SUCCESS,
    UPDATE_SORT,
    UPDATE_FILTERS,
    generateList,
    updateSort,
    updateFilters,
    cube,
    filters,
};