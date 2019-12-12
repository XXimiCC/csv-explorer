import React from 'react';
import Layout from "../../containers/Layout/Layout";
import {connect} from "react-redux";
import QueriesTable from "../../components/QueriesTable/QueriesTable";
import {downloadQueriesCSV} from "../../store/actions/queries";
import Loader from "../../components/Loader/Loader";
import * as _ from "lodash";
// import css from './HomePage.module.scss'


class HomePage extends React.Component {
  state = {
    searchTerm: '',
    searchRole: '',
    filteredQueries: []
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.queries !== prevProps.queries) {
      this.filterQueries();
    }
  }

  componentDidMount() {
    this.filterQueries();
  }

  filterQueries() {
    const searchRole = this.state.searchRole;
    const searchTerm = this.state.searchTerm;

    if (!searchRole && !searchTerm) {
      this.setState({
        filteredQueries: this.props.queries
      });

      return;
    }

    //TODO По необходимости сделать поиск по текстовым полям регистронезависимым

    const filteredQueries = _.filter(this.props.queries, (query) => {
      const fields = ['request', 'description', 'parameters', 'parameters_update'];
      const isFoundSearchTerm = !!_.find(fields, (field) => query[field] && query[field].indexOf(searchTerm) !== -1);
      const isFoundSearchRole = searchRole ? query.role && query.role.includes(searchRole) : true;

      return isFoundSearchTerm && isFoundSearchRole;
    });

    this.setState({filteredQueries});
  }

  onFilterChange = (event) => {
    this.setState({[event.currentTarget.name]: event.currentTarget.value}, () => {
      this.filterQueries();
    });
  };

  clearFilters = () => {
    this.setState({searchTerm: '', searchRole: ''}, () => this.filterQueries());
  };

  render() {
    const {downloadQueriesCSV, isLoading, downloadError} = this.props;
    const filteredQueries = this.state.filteredQueries;
    const isShowList = !!(this.props.queries.length && !downloadError);

    const renderError = () => (
      <p className={'text-center text-danger'}>Download CSV Error: {downloadError.message}</p>
    );

    const renderFilters = (
      <div className="row mb-3">
        <div className="col-md-3">
          <input className="form-control"
                 name="searchTerm"
                 type="text"
                 value={this.state.searchTerm}
                 onChange={this.onFilterChange}
                 placeholder="Search by text fields"
          />
        </div>
        <div className="col-md-3">
          <select
            name="searchRole"
            className="form-control"
            placeholder="Role Filter"
            value={this.state.searchRole}
            onChange={this.onFilterChange}
          >
            <option value=""/>
            {this.props.roles.map(role => (
              <option value={role} key={role}>{role}</option>
            ))}
          </select>
        </div>
        <button className="btn btn-secondary" onClick={this.clearFilters}>Clear</button>
      </div>
    );

    return (
      <Layout>
        {isLoading && <Loader />}
        <div className="d-flex justify-content-between d-flex align-items-center mb-3">
          <h3 className={'m-0'}>CSV Data</h3>
          <button className={'btn btn-primary'} onClick={() => downloadQueriesCSV()}>Download CSV</button>
        </div>
        {downloadError && renderError()}
        {isShowList && renderFilters}
        {isShowList && <QueriesTable data={filteredQueries}/>}
      </Layout>
    );
  }
}


function mapStateToProps(state) {
    return {
      queries: state.queries.list,
      isLoading: state.queries.isLoading,
      roles: state.queries.roles,
      downloadError: state.queries.downloadError
    }
}

function mapDispatchToProps(dispatch) {
    return {
      downloadQueriesCSV: () => dispatch(downloadQueriesCSV()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

