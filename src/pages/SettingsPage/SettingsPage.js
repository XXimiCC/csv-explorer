import React from 'react';
import Layout from "../../containers/Layout/Layout";
import SettingsForm from "../../components/SettingsForm/SettingsForm";
// import css from './Settings.module.scss'

const SettingsPage = (props) => {
  return (
    <Layout>
      <h3>Settings</h3>
      <SettingsForm />
    </Layout>
  );
};

export default SettingsPage;
