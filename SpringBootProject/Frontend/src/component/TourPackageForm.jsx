import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { NavBar } from "./NavBar"; // Adjust the import path as needed

export const TourPackageForm = () => {
  const [formData, setFormData] = useState({
    nameOfPackage: "",
    price: "",
    duration: "",
    tagline: "",
    bigDiscription: "",
    smallDescription: "",
    countryId: "",
    stateId: "",
    image: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const {
    nameOfPackage,
    price,
    duration,
    tagline,
    bigDiscription,
    smallDescription,
    countryId,
    stateId,
    image,
  } = formData;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("http://localhost:8080/countries");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = async (e) => {
    const selectedCountryId = e.target.value;
    setFormData({ ...formData, countryId: selectedCountryId, stateId: "" });

    try {
      const response = await axios.get(
        `http://localhost:8080/states/${selectedCountryId}`
      );
      setStates(response.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleStateChange = (e) => {
    const selectedStateId = e.target.value;
    setFormData({ ...formData, stateId: selectedStateId });
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       // Convert image to Base64 and store it in the formData
  //       setFormData({ ...formData, image: reader.result.split(",")[1] }); // Strip metadata
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Convert image to Base64 and store it in the formData
        setFormData({ ...formData, image: reader.result.split(",")[1] }); // Strip metadata
      };
      reader.readAsDataURL(file);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const data = {
  //     nameOfPackage,
  //     price,
  //     duration,
  //     tagLine: tagline,
  //     bigDiscription,
  //     smallDescription,
  //     countryId,
  //     stateId,
  //     image,
  //   };

  //   console.log("Submitting Package with data:", data);
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/package/addPackage",
  //       data
  //     );
  //     if (response.status === 200) {
  //       alert("Package added successfully!");
  //       setFormData({
  //         nameOfPackage: "",
  //         price: "",
  //         duration: "",
  //         tagline: "",
  //         bigDiscription: "",
  //         smallDescription: "",
  //         countryId: "",
  //         stateId: "",
  //         image: "",
  //       });
  //       setStates([]); // Clear states when a new package is added
  //     }
  //   } catch (error) {
  //     console.error("Error adding package:", error);
  //     alert("Error adding package");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      nameOfPackage,
      price,
      duration,
      tagLine: tagline,
      bigDiscription,
      smallDescription,
      countryId,
      stateId,
      image, // Send the image as Base64 string
    };
  
    try {
      const response = await axios.post(
        "http://localhost:8080/package/addPackage", 
        data, // Send the data as JSON
        {
          headers: {
            "Content-Type": "application/json", // Ensure the server expects JSON
          },
        }
      );
  
      if (response.status === 200) {
        alert("Package added successfully!");
        setFormData({
          nameOfPackage: "",
          price: "",
          duration: "",
          tagline: "",
          bigDiscription: "",
          smallDescription: "",
          countryId: "",
          stateId: "",
          image: "",  // Reset image after submit
        });
        setStates([]); // Clear states when a new package is added
      }
    } catch (error) {
      console.error("Error adding package:", error);
      alert("Error adding package");
    }
  };

  return (
    <div>
      <NavBar />
      <Container>
        <h2 className="text-center my-4">Add New Tour Package</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="packageName">
                <Form.Label>Tour Package Name</Form.Label>
                <Form.Control
                  type="text"
                  name="nameOfPackage"
                  value={nameOfPackage}
                  onChange={handleFieldChange}
                  placeholder="Enter Tour Package Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={price}
                  onChange={handleFieldChange}
                  placeholder="Enter Price"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="countryId">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  as="select"
                  name="countryId"
                  value={countryId}
                  onChange={handleCountryChange}
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.country_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="stateId">
                <Form.Label>State</Form.Label>
                <Form.Control
                  as="select"
                  name="stateId"
                  value={stateId}
                  onChange={handleStateChange}
                  required
                >
                  <option value="">Select State</option>
                  {states.length > 0 ? (
                    states.map((state) => (
                      <option key={state.stateId} value={state.stateId}>
                        {state.stateName}
                      </option>
                    ))
                  ) : (
                    <option value="">No states available</option>
                  )}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="duration">
                <Form.Label>Duration (Days & Nights)</Form.Label>
                <Form.Control
                  type="text"
                  name="duration"
                  value={duration}
                  onChange={handleFieldChange}
                  placeholder="Enter Duration"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="tagline">
                <Form.Label>Tagline</Form.Label>
                <Form.Control
                  type="text"
                  name="tagline"
                  value={tagline}
                  onChange={handleFieldChange}
                  placeholder="Enter Tagline"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId="bigDiscription">
                <Form.Label>Big Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="bigDiscription"
                  value={bigDiscription}
                  onChange={handleFieldChange}
                  placeholder="Enter Big Description"
                  rows={4}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="smallDescription">
                <Form.Label>Small Description</Form.Label>
                <Form.Control
                  type="text"
                  name="smallDescription"
                  value={smallDescription}
                  onChange={handleFieldChange}
                  placeholder="Enter Small Description"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="image">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </Form.Group>
              {image && (
                <div className="mt-3">
                  <p>Image Preview:</p>
                  <img
                    src={`data:image/jpeg;base64,${image}`}
                    alt="Preview"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                </div>
              )}
            </Col>
          </Row>

          <Button className="mt-3" type="submit">
            Add Package
          </Button>
        </Form>
      </Container>
    </div>
  );
};