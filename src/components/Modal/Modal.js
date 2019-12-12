import React, {createRef, useEffect} from 'react';
import ReactDOM from 'react-dom';
import * as $ from 'jquery';
// import css from './Modal.module.scss'

const Modal = (props) => {
  const modalRef = createRef();

  useEffect(() => {
    const $modalEl = $(modalRef.current);

    $modalEl.modal().on('hidden.bs.modal', props.closeHandler);

    return () => {
      $modalEl.modal('dispose');
    }
  }, [modalRef, props.closeHandler]);


  if (!props.show) {
    return null;
  }

  //TODO Дописать proptypes

  const template = (
    <div className="modal fade" role="dialog" ref={modalRef}>
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalScrollableTitle">{props.title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" >
            {props.children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    template,
    document.getElementById('modal-root')
  )
};

export default Modal;
