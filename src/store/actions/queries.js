import {
  DOWNLOAD_QUERIES_CSV_FAILURE,
  DOWNLOAD_QUERIES_CSV_REQUEST,
  DOWNLOAD_QUERIES_CSV_SUCCESS,
} from "./actionTypes";
import {downloadAndParseCSV} from "../../utils";
import * as _ from 'lodash';

export function downloadQueriesCSV(url) {
  return async (dispatch, getState) => {
    dispatch({type: DOWNLOAD_QUERIES_CSV_REQUEST});

    const url = getState().settings.downloadUrl;

    try{
      const data = await downloadAndParseCSV(url);

      dispatch({
        type: DOWNLOAD_QUERIES_CSV_SUCCESS,
        data,
        roles: collectRoles(data)
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

function collectRoles(queries) {
  return _.compact(
         _.uniq(
         _.flatMap(
         _.map(queries, 'role'))));
}