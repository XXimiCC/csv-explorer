import React from 'react';
import Layout from "../../containers/Layout/Layout";
import QueriesTable from "../../components/QueriesTable/QueriesTable";
import {connect} from "react-redux";
// import css from './ChangesPage.module.scss'

const ChangesPage = (props) => {
  return (
    <Layout>
      <h3>Changes Page</h3>
      {props.changes.length
        ? <QueriesTable data={props.changes}/>
        : <p className={'text-center'}>No Changes</p>
      }

    </Layout>
  );
};

function mapStateToProps(state) {
    return {
      changes: state.queries.changes
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangesPage);
