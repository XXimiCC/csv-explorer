import {DOWNLOAD_QUERIES_CSV_FAILURE, DOWNLOAD_QUERIES_CSV_REQUEST, DOWNLOAD_QUERIES_CSV_SUCCESS} from "./actionTypes";
import {downloadAndParseCSV} from "../../utils";

export function downloadQueriesCSV(url) {
  return async (dispatch, getState) => {
    dispatch({type: DOWNLOAD_QUERIES_CSV_REQUEST});

    const url = getState().settings.downloadUrl;

    try{
      const data = await downloadAndParseCSV(url);

      dispatch({
        type: DOWNLOAD_QUERIES_CSV_SUCCESS,
        data
      });
    } catch (e) {
      dispatch({
        type: DOWNLOAD_QUERIES_CSV_FAILURE,
        error: e
      });
      console.log('downloadQueriesCSV error:', e);
    }
  }
}