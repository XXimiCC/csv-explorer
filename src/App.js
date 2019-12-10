import React from 'react';
import './App.scss';
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import HomePage from "./pages/HomePage/HomePage";
import ChangesPage from "./pages/ChangesPage/ChangesPage";
import {Redirect, Route, Switch} from "react-router-dom";

function App() {
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

export default App;
