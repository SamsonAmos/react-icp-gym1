import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import RegisterGym from "./RegisterGym";
import Gym from "./Gym";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { getAllGyms, createGymProfile } from "../../utils/marketplace";


const Gyms = () => {
  const [gymName, setGymName] = useState("");
  const [gymImgUrl, setGymImgUrl] = useState("");
  const [gymLocation, setGymLocation] = useState("");
  const [gymDescription, setGymDescription] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFormFilled = () => gymName && gymImgUrl && gymLocation && gymDescription && emailAddress;

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      setProducts(await getAllGyms());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const createGym = async (data) => {
    try {
      setLoading(true);
      createGymProfile(data).then((resp) => {
        getProducts();
        toast(<NotificationSuccess text="Gym created successfully." />);
      });

    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a product." />);
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Gym Registry</h1>
            <RegisterGym
              save={createGym}
              gymName={gymName}
              setGymName={setGymName}
              gymImgUrl={gymImgUrl}
              setGymImgUrl={setGymImgUrl}
              gymLocation={gymLocation}
              setGymLocation={setGymLocation}
              gymDescription={gymDescription}
              setGymDescription={setGymDescription}
              emailAddress={emailAddress}
              setEmailAddress={setEmailAddress} />
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {products.map((_product) => (
              <Gym
                product={{
                  ..._product,
                }}
                View
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Gyms;
