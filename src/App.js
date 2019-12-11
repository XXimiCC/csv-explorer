import React from 'react';
import './App.scss';
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import HomePage from "./pages/HomePage/HomePage";
import ChangesPage from "./pages/ChangesPage/ChangesPage";
import {Redirect, Route, Switch} from "react-router-dom";
import {restoreDownloadUrl} from "./store/actions/settings";
import {connect} from "react-redux";

class App extends React.Component{
  constructor(props) {
    super(props);

    props.restoreDownloadUrl();
  }

  render () {
    return (
      <div className="App">
        <Switch>
          <Route path={'/'} exact component={HomePage} />
          <Route path={'/changes'} exact component={ChangesPage} />
          <Route path={'/settings'} exact component={SettingsPage} />
          <Redirect to={'/'}/>
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
  return {
    restoreDownloadUrl: () => dispatch(restoreDownloadUrl())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
