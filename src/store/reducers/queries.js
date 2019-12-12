import {
  DOWNLOAD_QUERIES_CSV_FAILURE,
  DOWNLOAD_QUERIES_CSV_REQUEST, DOWNLOAD_QUERIES_CSV_SUCCESS
} from "../actions/actionTypes";

function createInitialState() {
  return {
    isLoading: false,
    list: [],
    roles: [],
    downloadError: null
  }
}

const initialState = createInitialState();

const handlers = {
  [DOWNLOAD_QUERIES_CSV_REQUEST]: (state) => ({...state, isLoading: true}),
  [DOWNLOAD_QUERIES_CSV_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    downloadError: action.error
  }),
  [DOWNLOAD_QUERIES_CSV_SUCCESS]: (state, action) => ({
    ...state,
    list: action.data,
    roles: action.roles,
    isLoading: false,
    downloadError: null
  }),
  DEFAULT: state => state
};

export default function queriesReducer(state = initialState, action) {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
}