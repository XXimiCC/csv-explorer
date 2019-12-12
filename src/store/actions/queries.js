import {
  DOWNLOAD_QUERIES_CSV_FAILURE,
  DOWNLOAD_QUERIES_CSV_REQUEST,
  DOWNLOAD_QUERIES_CSV_SUCCESS,
} from "./actionTypes";
import {downloadAndParseCSV} from "../../utils";
import * as _ from 'lodash';
import {PREVIOUS_LIST_OF_QUERIES} from "../../const";

export function downloadQueriesCSV(url) {
  return async (dispatch, getState) => {
    dispatch({type: DOWNLOAD_QUERIES_CSV_REQUEST});

    const url = getState().settings.downloadUrl;

    try{
      const data = await downloadAndParseCSV(url);

      dispatch({
        type: DOWNLOAD_QUERIES_CSV_SUCCESS,
        data,
        changes: getChanges(data),
        roles: collectRoles(data)
      });

      saveDataToLS(data);
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

function saveDataToLS(data) {
  try {
    localStorage.setItem(PREVIOUS_LIST_OF_QUERIES, JSON.stringify(data));
  } catch (e) {
    //По хорошему тут нужно вывести какую-то ошибку в тостере или тому подобное
    alert('Data is too large to storing in localstorage');
  }
}

function getChanges(queries) {
  const lsData = localStorage.getItem(PREVIOUS_LIST_OF_QUERIES);
  const previousQueries = lsData && JSON.parse(lsData);

  if (!previousQueries) return [];

  return _.filter(queries, (query, i) => {
    if (!previousQueries[i]) return true;

    return JSON.stringify(query) !== JSON.stringify(previousQueries[i]);
  });
}