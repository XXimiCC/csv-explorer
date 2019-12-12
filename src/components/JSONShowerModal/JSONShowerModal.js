import React, {createRef, useEffect} from 'react';
import * as $ from 'jquery';
import Modal from "../Modal/Modal";
import JSONFormatter from 'json-formatter-js';
import * as Proptypes from "prop-types";

const JSONShowerModal = ({json, ...props}) => {
  const modalBodyRef = createRef();

  useEffect(() => {
    if (!json) return;

    const $body = $(modalBodyRef.current);

    try {
      const jsonFormatter = new JSONFormatter(JSON.parse(json));

      $body.html('');
      $body.append(jsonFormatter.render());
    } catch (e) {
      $body.html('INVALID JSON');
    }
  }, [modalBodyRef, json]);

  return (
    <Modal {...props}>
      <div ref={modalBodyRef}>
      </div>
    </Modal>

  );
};

JSONShowerModal.propTypes = {
  json: Proptypes.string.isRequired
};

export default JSONShowerModal;
