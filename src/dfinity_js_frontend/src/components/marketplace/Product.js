import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Card, Button, Col, Badge, Stack } from "react-bootstrap";
import { Principal } from "@dfinity/principal";
import ProductDetailsModal from "./ProductDetailsModal";
import { getGymById } from "../../utils/marketplace";
import EnrollModal from "./EnrollModal";

const Product = ({ product }) => {
  const { id, gymImgUrl, gymLocation } = product;
  const [gymDetailsModal, setGymDetailsModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const closeGymDetailsModal = () => setGymDetailsModal(false);
  const closeEnrollModal = () => setShowEnrollModal(false);
  const [gymDetails, setGymDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const getProductById = useCallback(async (id) => {
    try {
      setLoading(true);
      setGymDetails(await getGymById(id));
      showEnrollModal(true);
      console.log('products1', gymDetails)
    } catch (error) {
      console.log({ error });
    } finally {
      console.log('products2', gymDetails)

    }
  });


  const enroll = async (data) => {
    try {
      // setLoading(true);
      registerForAgym(data).then((resp) => {
        console.log(data)
      });
      toast(<NotificationSuccess text="Product added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a product." />);
    } finally {
      // setLoading(false);
    }
  };


  return (
    <>
      <ProductDetailsModal closeGymDetailsModal={closeGymDetailsModal} gymDetailsModal={gymDetailsModal} gymDetails={gymDetails} />
      <EnrollModal closeEnrollModal={closeEnrollModal} showEnrollModal={showEnrollModal} gymDetails={gymDetails} />
      <Col key={id}>
        <Card className=" h-100">
          <div className=" ratio ratio-4x3">
            <img src={gymImgUrl} alt="barber_icon" style={{ objectFit: "cover" }} />
          </div>
          <Card.Body className="d-flex  flex-column text-center">
            <Card.Title>{id}
              {/* {products} */}
            </Card.Title>
            <Card.Text className="flex-grow-1 ">{gymLocation}</Card.Text>
            <Button
              variant="outline-dark"
              onClick={() => getProductById(id)}
              className="w-100 py-3"
            >
              View
            </Button>

            <Button
              variant="outline-dark"
              onClick={() => getProductById(id)}
              className="w-100 py-3"
            >
              Enroll
            </Button>

          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

Product.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  // buy: PropTypes.func.isRequired,
};

export default Product;
