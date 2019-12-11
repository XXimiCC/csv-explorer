import React from 'react';
import Layout from "../../containers/Layout/Layout";
import {connect} from "react-redux";
import QueriesTable from "../../components/QueriesTable/QueriesTable";
import {downloadQueriesCSV} from "../../store/actions/queries";
import Loader from "../../components/Loader/Loader";
// import css from './HomePage.module.scss'


const HomePage = ({downloadQueriesCSV, queries, isLoading, downloadError}) => {
  const renderError = () => (
    <p className={'text-center text-danger'}>Download CSV Error: {downloadError.message}</p>
  );

  return (
    <Layout>
      {isLoading && <Loader />}
      <div className="d-flex justify-content-between d-flex align-items-center mb-3">
        <h3 className={'m-0'}>CSV Data</h3>
        <button className={'btn btn-primary'} onClick={() => downloadQueriesCSV()}>Download CSV</button>
      </div>
      {downloadError && renderError()}
      {queries.length && !downloadError ? <QueriesTable data={queries}/> : null}
    </Layout>
  );
};

function mapStateToProps(state) {
    return {
      queries: state.queries.data,
      isLoading: state.queries.isLoading,
      downloadError: state.queries.downloadError
    }
}

function mapDispatchToProps(dispatch) {
    return {
      downloadQueriesCSV: () => dispatch(downloadQueriesCSV())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

