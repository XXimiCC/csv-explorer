import React from 'react';
import ReactDOM from 'react-dom';
import css from './Loader.module.scss'

const Loader = (props) => {
  if (props.show === false) {
    return null;
  }

  const loader = (
    <div className={css.ldsRing}>
      <div/>
      <div/>
      <div/>
      <div/>
    </div>
  );

  const overlay = (
    <div className={css.overlay} />
  );

  const component = (
    <>
      {loader}
      {overlay}
    </>
  );

  return ReactDOM.createPortal(
    component,
    document.getElementById('modal-root')
  );

};

export default Loader;
