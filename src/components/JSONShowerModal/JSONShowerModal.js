import React from 'react';
import Modal from "../Modal/Modal";
import * as Proptypes from "prop-types";
import JSONPrettify from "../JSONPrettify/JSONPrettify";

const JSONShowerModal = ({json, ...props}) => {
  let modalBody = null;

  if (!json) {
    return null;
  }

  try {
    const data = JSON.parse(json);

    modalBody = <JSONPrettify data={data}/>;
  } catch (e) {
    modalBody = 'INVALID JSON';
  }

  return (
    <Modal {...props}>
      {modalBody}
    </Modal>
  );
};

JSONShowerModal.propTypes = {
  json: Proptypes.string.isRequired
};

export default JSONShowerModal;
