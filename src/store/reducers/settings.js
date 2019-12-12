import {
  DOWNLOAD_QUERIES_CSV_SUCCESS,
  RESTORE_DOWNLOAD_URL,
  SAVE_NEW_DOWNLOAD_URL
} from "../actions/actionTypes";

function createInitialState() {
  return {
    downloadUrl: ""
  }
}

const initialState = createInitialState();

const handlers = {
  [RESTORE_DOWNLOAD_URL]: (state, action) => ({...state, downloadUrl: action.url}),
  [SAVE_NEW_DOWNLOAD_URL]: (state, action) => ({...state, downloadUrl: action.url}),
  [DOWNLOAD_QUERIES_CSV_SUCCESS]: (state, action) => ({
    ...state,
    data: action.data,
    isLoading: false,
    downloadError: null
  }),
  DEFAULT: state => state
};

export default function settingsReducer(state = initialState, action) {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
}