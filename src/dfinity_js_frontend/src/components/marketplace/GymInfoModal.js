import React, { useState, useEffect, useCallback } from "react";
import { Modal, Card, Button } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import GymEnrollModal from "./GymEnrollModal";
import { getAllEnrollesByGymId } from "../../utils/marketplace";

const GymInfoModal = ({ closeGymDetailsModal, gymDetailsModal, gymDetails, enroll, getMembers, gymMembers }) => {
    const [key, setKey] = useState('details');


    useEffect(() => {
        if (gymDetails?.Ok?.id) {
            getMembers(gymDetails.Ok.id);
        }
    }, [gymDetails?.Ok?.id, getMembers]);


    console.log('gymMembers3', gymMembers)

    return (
        <>
            {Object.keys(gymDetails).length !== 0 &&
                <>
                    <Modal show={gymDetailsModal} onHide={closeGymDetailsModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontSize: 12 }}>Gym's Profile: {gymDetails.Ok.id}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Card className=" h-100">
                                <div className=" ratio ratio-4x3">
                                    <img src={gymDetails.Ok.gymImgUrl} alt="barber_icon" style={{ objectFit: "cover" }} />
                                </div>
                                <Card.Body className="d-flex  flex-column text-justify" style={{ fontSize: 12 }}>

                                    <Tabs
                                        id="controlled-tab-example"
                                        activeKey={key}
                                        onSelect={(k) => setKey(k)}
                                        className="mb-3"
                                    >
                                        <Tab eventKey="details" title="Details">
                                            <Card.Text ><b>Gym Name:</b> {" "}{gymDetails.Ok.gymName}</Card.Text>
                                            <Card.Text ><b>Gym Email:</b> {" "}{gymDetails.Ok.emailAddress}</Card.Text>
                                            <Card.Text ><b>Location:</b> {" "}{gymDetails.Ok.gymLocation}</Card.Text>
                                            <Card.Text ><b>Description:</b> {" "}{gymDetails.Ok.gymDescription}</Card.Text>

                                            {/* <Button
                                                variant="primary"
                                                // disabled={!isFormFilled()}
                                                onClick={() => getMembers(gymDetails.Ok.id)}
                                            >
                                                View Members
                                            </Button> */}

                                            <p className="text-center">Gym Members</p>

                                            {/* {gymMembers.map((member) => (
                                                <React.Fragment key={member.userId}>
                                                    <Card.Text className="text-capitalize">Fullname: {member.fullName}</Card.Text>
                                                    <Card.Text>USER_ID: {member.userId}</Card.Text>
                                                </React.Fragment>
                                            ))} */}

                                            <ol>
                                                {gymMembers.map((member) => (
                                                    <li key={member.userId}>
                                                        <Card.Text className="text-capitalize "><b>FULLNAME:</b> {member.fullName}</Card.Text>
                                                        <Card.Text>USER_NAME: {member.userName}</Card.Text>
                                                        <Card.Text>USER_ID: {member.userId}</Card.Text>
                                                    </li>
                                                ))}
                                            </ol>


                                        </Tab>
                                        <Tab eventKey="enroll" title="Enroll">
                                            <GymEnrollModal save={enroll} gymDetails={gymDetails} />
                                        </Tab>
                                    </Tabs>

                                </Card.Body>
                            </Card>
                        </Modal.Body>
                    </Modal>
                </>
            }

        </>
    );
};


export default GymInfoModal;
