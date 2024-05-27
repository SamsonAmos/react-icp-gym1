import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const RegisterGym = ({ save }) => {
  const [gymName, setGymName] = useState("");
  const [gymImgUrl, setGymImgUrl] = useState("");
  const [gymLocation, setGymLocation] = useState("");
  const [gymDescription, setGymDescription] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const isFormFilled = () => gymName && gymImgUrl && gymLocation && gymDescription && emailAddress;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        variant="dark"
      // className="rounded-pill px-0"
      // style={{ width: "38px" }}
      >Register Gym {" "}
        <i class="bi bi-plus"></i>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Gym</Modal.Title>
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
                placeholder="Enter gym location"
                // style={{ height: "80px" }}
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
              });
              handleClose();
            }}
          >
            Create Gym
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

RegisterGym.propTypes = {
  save: PropTypes.func.isRequired,
};

export default RegisterGym;
