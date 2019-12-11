import * as Papa from "papaparse";

export function downloadAndParseCSV(url) {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      delimiter: ';',
      download: true,
      header: true,
      skipEmptyLines: true,
      transform: (value, key) => {
        switch (key) {
          case 'role':
            return value.split(' ');
          case 'parameters_update':
            return (new Date(value)).toLocaleString('ru');
          default:
            return value;
        }
      },
      complete: (results) => {
        const errors = results.errors;
        let data = results.data;

        if (errors.length) {
          errors.forEach((error) => {
            data[error.row].errorMessage = error.message;
          })
        }

        resolve(data);
      },
      error: (error) => {
        reject(error);
      }
    });
  })
}