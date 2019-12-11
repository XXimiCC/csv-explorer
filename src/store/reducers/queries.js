import {
  DOWNLOAD_QUERIES_CSV_FAILURE,
  DOWNLOAD_QUERIES_CSV_REQUEST, DOWNLOAD_QUERIES_CSV_SUCCESS,
} from "../actions/actionTypes";

function createInitialState() {
  return {
    isLoading: false,
    data: [],
    downloadError: null
  }
}

const initialState = createInitialState();

export default function queriesReducer(state = initialState, action) {
  switch (action.type) {
    case DOWNLOAD_QUERIES_CSV_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case DOWNLOAD_QUERIES_CSV_FAILURE:
      return {
        ...state,
        isLoading: false,
        downloadError: action.error
      };
    case DOWNLOAD_QUERIES_CSV_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        downloadError: false,
      };
    default:
      return state
  }
}