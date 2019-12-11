import React from 'react';
// import css from './QueriesTable.module.scss'

const QueriesTable = ({data}) => {
  const renderRowWithParsingError = (query, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td colSpan="5" className="text-danger">
        Parsing ERROR: {query.errorMessage}
      </td>
    </tr>
  );

  const renderRow = (query, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{query.request}</td>
      <td>{query.description}</td>
      <td>{query.parameters.slice(0, 20).concat('...')}</td>
      {/*<td>{query.parameters}</td>*/}
      <td>{query.parameters_update}</td>
      <td>{query.role.map((role, j) => (
        <span className="badge badge-info mr-1" key={j}>{role}</span>
      ))}</td>
    </tr>
  );


  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Request</th>
          <th>Description</th>
          <th>Parameters</th>
          <th>Parameters Update</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
      {data.map((query, i) => (
        query.errorMessage ? renderRowWithParsingError(query, i) : renderRow(query, i)
      ))}
      </tbody>
    </table>
  );
};

export default QueriesTable;
