import { List, Map } from 'immutable';
import { generateRandomList } from '../utils';

const GET_LIST = 'app/cube/GET_LIST';
const GET_LIST_SUCCESS = 'app/cube/GET_LIST_SUCCESS';
const UPDATE_SORT = 'app/cube/UPDATE_SORT';

const getListSuccess = () => {
    return {
        type: GET_LIST_SUCCESS,
        payload: generateRandomList()
    };
};

const getList = () => getListSuccess();

const updateSort = (sort) => {
    return {
        type: UPDATE_SORT,
        payload: sort
    };
};

export {
    GET_LIST,
    GET_LIST_SUCCESS,
    getList,
    UPDATE_SORT,
    updateSort,
};

const initialState = Map({
    list: List(),
    sort: Map({ name: '', direction: 'ASC'})
});

export default function cube(state = initialState, action) {
    switch (action.type) {
        case GET_LIST_SUCCESS:
            return state.set('list', List(action.payload));
        case UPDATE_SORT:
            return state.set('sort', Map(action.payload));
        default:
            return state;
    }
}