import React from "react";
import PropTypes from "prop-types";
import { Modal, Card } from "react-bootstrap";

const ProductDetailsModal = ({ closeGymDetailsModal, gymDetailsModal, gymDetails }) => {
    return (
        <>
            {Object.keys(gymDetails).length !== 0 &&
                <Modal show={gymDetailsModal} onHide={closeGymDetailsModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Gym's Profile: {gymDetails.Ok.id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card className=" h-100">
                            <div className=" ratio ratio-4x3">
                                <img src={gymDetails.Ok.gymImgUrl} alt="barber_icon" style={{ objectFit: "cover" }} />
                            </div>
                            <Card.Body className="d-flex  flex-column text-center">
                                <Card.Title>Hello
                                </Card.Title>
                                <Card.Text className="flex-grow-1 ">{gymDetails.Ok.gymName}</Card.Text>
                                <Card.Text className="flex-grow-1 ">{gymDetails.Ok.gymLocation}</Card.Text>
                                <Card.Text className="flex-grow-1 ">{gymDetails.Ok.gymDescriptio}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Modal.Body>
                </Modal>
            }
        </>
    );
};


export default ProductDetailsModal;
