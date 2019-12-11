import {RESTORE_DOWNLOAD_URL, SAVE_NEW_DOWNLOAD_URL} from "./actionTypes";
import {DOWNLOAD_URL} from "../../const";

export function saveNewDownloadUrl(url) {
  try {
    localStorage.setItem(DOWNLOAD_URL, url);
  } catch (e) {
    alert('LocalStorage Save Error');
    return;
  }

  return {
    type: SAVE_NEW_DOWNLOAD_URL,
    url
  }
}

export function restoreDownloadUrl() {
  const url = localStorage.getItem(DOWNLOAD_URL) || process.env.REACT_APP_DEFAULT_CSV_URL;

  return {
    type: RESTORE_DOWNLOAD_URL,
    url
  }
}
