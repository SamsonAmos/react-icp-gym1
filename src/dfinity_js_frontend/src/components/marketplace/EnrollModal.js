import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const EnrollModal = ({ save, showEnrollModal }) => {
    const [userName, setUserName] = useState("");
    const isFormFilled = () => userName

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {Object.keys(gymDetails).length !== 0 &&
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Enroll Gym</Modal.Title>
                    </Modal.Header>
                    <Form>

                        <Modal.Body>
                            <FloatingLabel
                                controlId="userName"
                                label="Username"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    onChange={(e) => {
                                        setUserName(e.target.value);
                                    }}
                                    placeholder="Enter username"
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
                                    userName,
                                });
                                handleClose();
                            }}
                        >
                            Create Gym
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </>

    );

};

EnrollModal.propTypes = {
    save: PropTypes.func.isRequired,
};

export default EnrollModal;
