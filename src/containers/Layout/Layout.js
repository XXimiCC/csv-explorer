import React from 'react';
// import css from './Layout.module.scss'
import Navbar from "../../components/Navbar/Navbar";

const Layout = (props) => {
  const className = props.fluid ? 'container-fluid' : 'container';

  return (
    <>
      <Navbar />
      <div className={className}>
        {props.children}
      </div>
    </>
  );
};

export default Layout;
