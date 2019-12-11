import {
  RESTORE_DOWNLOAD_URL,
  SAVE_NEW_DOWNLOAD_URL
} from "../actions/actionTypes";

function createInitialState() {
  return {
    downloadUrl: ""
  }
}

const initialState = createInitialState();

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case RESTORE_DOWNLOAD_URL:
    case SAVE_NEW_DOWNLOAD_URL:
      return {
        ...state,
        downloadUrl: action.url
      };
    default:
      return state
  }
}