import Postcode from "@actbase/react-daum-postcode";
import React from "react";
import Modal from "react-bootstrap/Modal";

const PostModal = ({ show, handleModal, handlePostCode }) => {
  return (
    <div>
      <Modal show={show} onHide={handleModal}>
        <Postcode
          jsOptions={{ animation: true }}
          onSelected={(data) => handlePostCode(data)}
        />
      </Modal>
    </div>
  );
};

export default PostModal;
