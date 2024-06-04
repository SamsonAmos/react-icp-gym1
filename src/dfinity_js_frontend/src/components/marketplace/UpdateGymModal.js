import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const UpdateGymModal = ({
  save,
  gymName,
  setGymName,
  gymImgUrl,
  setGymImgUrl,
  gymLocation,
  setGymLocation,
  gymDescription,
  setGymDescription,
  emailAddress,
  setEmailAddress, show, handleClose, handleShow, isFormFilled }) => {


  return (
    <>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Gym: { }</Modal.Title>
        </Modal.Header>
        <Form>

          <Modal.Body>
            <FloatingLabel
              controlId="gymName"
              label="Gym Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                value={gymName}
                onChange={(e) => {
                  setGymName(e.target.value);
                }}
                placeholder="Enter name of gym"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="gymImgUrl"
              label="Image URL"
              className="mb-3"
            >
              <Form.Control
                type="text"
                value={gymImgUrl}
                placeholder="Image URL"
                onChange={(e) => {
                  setGymImgUrl(e.target.value);
                }}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="emailAddress"
              label="Email Address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                value={emailAddress}
                placeholder="Email address"
                onChange={(e) => {
                  setEmailAddress(e.target.value);
                }}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="gymLocation"
              label="Gym Location"
              className="mb-3"
            >
              <Form.Control
                type="text"
                value={gymLocation}
                placeholder="Enter gym location"
                onChange={(e) => {
                  setGymLocation(e.target.value);
                }}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="gymDescription"
              label="Gym Description"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Description"
                value={gymDescription}
                onChange={(e) => {
                  setGymDescription(e.target.value);
                }}
              />
            </FloatingLabel>

          </Modal.Body>
        </Form>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            disabled={!isFormFilled()}
            onClick={() => {
              save({
                gymName,
                gymImgUrl,
                gymLocation,
                gymDescription,
                emailAddress,
                id
              });
              handleClose();
            }}
          >
            Update Gym
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};



UpdateGymModal.propTypes = {
  save: PropTypes.func.isRequired,
  gymName: PropTypes.string.isRequired,
  setGymName: PropTypes.func.isRequired,
  gymImgUrl: PropTypes.string.isRequired,
  setGymImgUrl: PropTypes.func.isRequired,
  gymLocation: PropTypes.string.isRequired,
  setGymLocation: PropTypes.func.isRequired,
  gymDescription: PropTypes.string.isRequired,
  setGymDescription: PropTypes.func.isRequired,
  emailAddress: PropTypes.string.isRequired,
  setEmailAddress: PropTypes.func.isRequired,
};

export default UpdateGymModal;
