

// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Table,
//   Alert,
//   Card,
// } from "react-bootstrap";
// import { NavBar } from "./NavBar";
// import Footer from "./Footer";
// import { Router } from "../Route/Route";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export function HomeAfterLoginAdmin() {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [newCountry, setNewCountry] = useState("");
//   const [newState, setNewState] = useState("");
//   const [selectedCountryId, setSelectedCountryId] = useState("");
//   const [alertMessage, setAlertMessage] = useState(null);
//   const [alertVariant, setAlertVariant] = useState("info");

//   useEffect(() => {
//     getAllCountries();
//     getAllStates();
//   }, []);

//   const getAllCountries = async () => {
//     try {
//       const response = await axios.get("http://localhost:5255/country");
//       console.log("Fetched countries:", response.data);  // Check if it's an array
  
//       setCountries(response.data); // Directly set countries as it's an array
//     } catch (error) {
//       console.error("Error fetching countries:", error);
//     }
//   };
  

//   const getAllStates = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5255/state"
//       );
//       console.log("Fetched states:", response.data);
//       setStates(response.data || []);
//     } catch (error) {
//       console.error("Error fetching states:", error);
//     }
//   };

//   const handleAddCountry = async () => {
//     if (newCountry.trim()) {
//       const existingCountry = countries.find(
//         (country) =>
//           country?.CountryName?.toLowerCase() === newCountry.trim().toLowerCase()
//       );

//       if (existingCountry) {
//         setAlertMessage(`Country "${newCountry}" already exists!`);
//         setAlertVariant("warning");
//         return;
//       }

//       try {
//         const response = await axios.post("http://localhost:5255/country", {
//           CountryName: newCountry.trim(),
//         });
//         const addedCountry = response.data;

//         setCountries([...countries, addedCountry]);
//         setNewCountry("");
//         setAlertMessage(`Country "${newCountry}" added successfully!`);
//         setAlertVariant("success");
//       } catch (error) {
//         console.error("Error adding country:", error);
//         setAlertMessage("Failed to add country. Please try again.");
//         setAlertVariant("danger");
//       }
//     } else {
//       setAlertMessage("Country name cannot be empty!");
//       setAlertVariant("danger");
//     }
//   };

//   const handleAddState = async () => {
//     if (newState.trim() && selectedCountryId) {
//       const existingState = states.find(
//         (state) =>
//           state.StateName?.toLowerCase() === newState.trim().toLowerCase() &&
//           state.countryId === parseInt(selectedCountryId)
//       );

//       if (existingState) {
//         setAlertMessage(`State "${newState}" already exists in this country!`);
//         setAlertVariant("warning");
//         return;
//       }

//       try {
//         const response = await axios.post(
//           `http://localhost:5255/state/${selectedCountryId}`,
//           {
//             countryId: selectedCountryId,
//             StateName: newState.trim(),
//           }
//         );
//         const addedState = response.data;

//         setStates([...states, addedState]);
//         setNewState("");
//         setSelectedCountryId("");
//         setAlertMessage(`State "${newState}" added successfully!`);
//         setAlertVariant("success");
//       } catch (error) {
//         console.error("Error adding state:", error);
//         setAlertMessage("Failed to add state. Please try again.");
//         setAlertVariant("danger");
//       }
//     } else {
//       setAlertMessage("State name or country selection cannot be empty!");
//       setAlertVariant("danger");
//     }
//   };
//   const getCountryNameById = (countryId) => {
//     console.log("Looking for countryId:", countryId); // Log countryId
//     const country = countries.find((c) => c.id === countryId); // Find the country by ID
//     if (!country) {
//       console.log("Country not found for ID:", countryId); // Log when country is not found
//     }
//     console.log("Found country:", country); // Log the found country
//     return country ? country.countryName : "Unknown"; // Return countryName instead of name
//   };
  
//   const handleCloseAlert = () => setAlertMessage(null);

//   return (
//     <div>
//       <NavBar />
//       <Container className="my-4">
//         <Card className="mb-4">
//           <Card.Header as="h1" className="text-center">
//             Admin Dashboard
//           </Card.Header>
//           <Card.Body className="text-center">
//             <Card.Text>Manage countries, states, and more!</Card.Text>
//           </Card.Body>
//         </Card>

//         {alertMessage && (
//           <Alert
//             variant={alertVariant}
//             onClose={handleCloseAlert}
//             dismissible
//             className="mb-4"
//           >
//             {alertMessage}
//           </Alert>
//         )}

//         <Row>
//           <Col md={6}>
//             <Card className="mb-4">
//               <Card.Header>Countries</Card.Header>
//               <Card.Body>
//                 <Table striped bordered hover responsive>
//                   <thead>
//                     <tr>
//                       <th>ID</th>
//                       <th>Country</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                   {countries.length > 0 ? (
//       countries.map((country) => (
//         <tr key={country.id}>
//           <td>{country.id}</td>
//           <td>{country.countryName}</td>

//                       </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="2">No countries available.</td>
//                       </tr>
//                     )}
                   
//                   </tbody>
//                 </Table>
//               </Card.Body>
//             </Card>
//           </Col>

//           <Col md={6}>
//             <Card className="mb-4">
//               <Card.Header>Add a New Country</Card.Header>
//               <Card.Body>
//                 <Form>
//                   <Form.Group controlId="formCountry" className="mb-3">
//                     <Form.Label>Country Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter country name"
//                       value={newCountry}
//                       onChange={(e) => setNewCountry(e.target.value)}
//                     />
//                   </Form.Group>
//                   <Button variant="success" onClick={handleAddCountry}>
//                     Add Country
//                   </Button>
//                 </Form>
//               </Card.Body>
//             </Card>

//             <Form.Group controlId="formSelectCountry" className="mb-3">
//               <Form.Label>Select Country</Form.Label>
//               <Form.Select
//                 value={selectedCountryId}
//                 onChange={(e) => setSelectedCountryId(e.target.value)}
//               >
//                 <option value="">Choose a country</option>
//                 {countries.map((country) => (
//                   <option key={country.id} value={country.id}>
//                     {country.countryName}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             <Card className="mb-4">
//               <Card.Header>Add a New State</Card.Header>
//               <Card.Body>
//                 <Form>
//                   <Form.Group controlId="formState" className="mb-3">
//                     <Form.Label>State Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter state name"
//                       value={newState}
//                       onChange={(e) => setNewState(e.target.value)}
//                     />
//                   </Form.Group>
//                   <Button variant="success" onClick={handleAddState}>
//                     Add State
//                   </Button>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         <Row className="mt-3 mb-3" >
//            <Col  md={12} className="text-center"><Link to={Router.ADDPACKAGE}>
//             <Button variant="primary">Package Operations</Button>
//           </Link></Col>
//           </Row>

//         <Row>
//           <Col md={12}>
//             <Card>
//               <Card.Header>States</Card.Header>
//               <Card.Body>
//                 <Table striped bordered hover responsive>
//                   <thead>
//                     <tr>
//                       <th>ID</th>
//                       <th>State</th>
//                       <th>Country</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {/* {states.map((state, index) => ( 
//                        console.log(state),
//                       <tr key={index}>
//                         <td>{index + 1}</td>
//                         <td>{state.stateName}</td>
//                         <td>{state.countryName}</td>
//                       </tr>
//                    ))} */}
//                    {states.length > 0 ? (
//                     states.map((state) => {
//                       console.log("State data:", state);
//                       // Get the country name by matching the countryId from state
//                       const countryName = getCountryNameById(state.countryId); 
//                       return (
//                         <tr key={state.id}>
//                           <td>{state.id}</td>
//                           <td>{state.stateName}</td>
//                           <td>{countryName}</td> {/* Display the country name */}
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td colSpan="3">No states available.</td>
//                     </tr>
//                   )}
                   
//                   </tbody>
//                 </Table>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//       <Footer />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Alert,
  Card,
} from "react-bootstrap";
import { NavBar } from "./NavBar";
import Footer from "./Footer";
import { Router } from "../Route/Route";
import { Link } from "react-router-dom";
import axios from "axios";

export function HomeAfterLoginAdmin() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [newState, setNewState] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("info");
  const [editingCountryId, setEditingCountryId] = useState(null);
  const [editingStateId, setEditingStateId] = useState(null);
  const [editedCountryName, setEditedCountryName] = useState("");
  const [editedStateName, setEditedStateName] = useState("");

  useEffect(() => {
    getAllCountries();
    getAllStates();
  }, []);

  const getAllCountries = async () => {
    try {
      const response = await axios.get("http://localhost:5255/country");
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const getAllStates = async () => {
    try {
      const response = await axios.get("http://localhost:5255/state");
      setStates(response.data || []);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleAddCountry = async () => {
    if (newCountry.trim()) {
      const existingCountry = countries.find(
        (country) =>
          country?.countryName?.toLowerCase() === newCountry.trim().toLowerCase()
      );

      if (existingCountry) {
        setAlertMessage(`Country "${newCountry}" already exists!`);
        setAlertVariant("warning");
        return;
      }

      try {
        const response = await axios.post("http://localhost:5255/country", {
          CountryName: newCountry.trim(),
        });
        setCountries([...countries, response.data]);
        setNewCountry("");
        setAlertMessage(`Country "${newCountry}" added successfully!`);
        setAlertVariant("success");
      } catch (error) {
        console.error("Error adding country:", error);
        setAlertMessage("Failed to add country. Please try again.");
        setAlertVariant("danger");
      }
    } else {
      setAlertMessage("Country name cannot be empty!");
      setAlertVariant("danger");
    }
  };

  const handleAddState = async () => {
    if (newState.trim() && selectedCountryId) {
      const existingState = states.find(
        (state) =>
          state.stateName?.toLowerCase() === newState.trim().toLowerCase() &&
          state.countryId === parseInt(selectedCountryId)
      );

      if (existingState) {
        setAlertMessage(`State "${newState}" already exists in this country!`);
        setAlertVariant("warning");
        return;
      }

      try {
        const response = await axios.post(
          `http://localhost:5255/state/${selectedCountryId}`,
          {
            countryId: selectedCountryId,
            StateName: newState.trim(),
          }
        );
        setStates([...states, response.data]);
        setNewState("");
        setSelectedCountryId("");
        setAlertMessage(`State "${newState}" added successfully!`);
        setAlertVariant("success");
      } catch (error) {
        console.error("Error adding state:", error);
        setAlertMessage("Failed to add state. Please try again.");
        setAlertVariant("danger");
      }
    } else {
      setAlertMessage("State name or country selection cannot be empty!");
      setAlertVariant("danger");
    }
  };

  const handleUpdateCountry = async (id) => {
    try {
      await axios.put(`http://localhost:5255/country/${id}`, {
        CountryName: editedCountryName,
      });
      const updatedCountries = countries.map((country) =>
        country.id === id
          ? { ...country, countryName: editedCountryName }
          : country
      );
      setCountries(updatedCountries);
      setEditingCountryId(null);
      setAlertMessage("Country updated successfully!");
      setAlertVariant("success");
    } catch (error) {
      console.error("Error updating country:", error);
      setAlertMessage("Failed to update country. Please try again.");
      setAlertVariant("danger");
    }
  };

  const handleDeleteCountry = async (id) => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      try {
        await axios.delete(`http://localhost:5255/country/${id}`);
        setCountries(countries.filter((country) => country.id !== id));
        setAlertMessage("Country deleted successfully!");
        setAlertVariant("success");
      } catch (error) {
        console.error("Error deleting country:", error);
        setAlertMessage("Failed to delete country. Please try again.");
        setAlertVariant("danger");
      }
    }
  };

  const handleUpdateState = async (id) => {
    try {
      await axios.put(`http://localhost:5255/state/${id}`, {
        StateName: editedStateName,
      });
      const updatedStates = states.map((state) =>
        state.id === id ? { ...state, stateName: editedStateName } : state
      );
      setStates(updatedStates);
      setEditingStateId(null);
      setAlertMessage("State updated successfully!");
      setAlertVariant("success");
    } catch (error) {
      console.error("Error updating state:", error);
      setAlertMessage("Failed to update state. Please try again.");
      setAlertVariant("danger");
    }
  };

  const handleDeleteState = async (id) => {
    if (window.confirm("Are you sure you want to delete this state?")) {
      try {
        await axios.delete(`http://localhost:5255/state/${id}`);
        setStates(states.filter((state) => state.id !== id));
        setAlertMessage("State deleted successfully!");
        setAlertVariant("success");
      } catch (error) {
        console.error("Error deleting state:", error);
        setAlertMessage("Failed to delete state. Please try again.");
        setAlertVariant("danger");
      }
    }
  };

  const getCountryNameById = (countryId) => {
    const country = countries.find((c) => c.id === countryId);
    return country ? country.countryName : "Unknown";
  };

  const handleCloseAlert = () => setAlertMessage(null);

  return (
    <div>
      <NavBar />
      <Container className="my-4">
        <Card className="mb-4">
          <Card.Header as="h1" className="text-center">
            Admin Dashboard
          </Card.Header>
          <Card.Body className="text-center">
            <Card.Text>Manage countries, states, and more!</Card.Text>
          </Card.Body>
        </Card>

        {alertMessage && (
          <Alert
            variant={alertVariant}
            onClose={handleCloseAlert}
            dismissible
            className="mb-4"
          >
            {alertMessage}
          </Alert>
        )}

        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>Countries</Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Country</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countries.length > 0 ? (
                      countries.map((country) => (
                        <tr key={country.id}>
                          <td>{country.id}</td>
                          <td>
                            {editingCountryId === country.id ? (
                              <Form.Control
                                type="text"
                                value={editedCountryName}
                                onChange={(e) =>
                                  setEditedCountryName(e.target.value)
                                }
                              />
                            ) : (
                              country.countryName
                            )}
                          </td>
                          <td>
                            {editingCountryId === country.id ? (
                              <Button
                                variant="primary"
                                onClick={() =>
                                  handleUpdateCountry(country.id)
                                }
                              >
                                Save
                              </Button>
                            ) : (
                              <Button
                                variant="primary"
                                onClick={() => {
                                  setEditingCountryId(country.id);
                                  setEditedCountryName(country.countryName);
                                }}
                              >
                                Update
                              </Button>
                            )}
                            <Button
                              variant="danger"
                              onClick={() =>
                                handleDeleteCountry(country.id)
                              }
                              className="ms-2"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">No countries available.</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>Add New Country</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Country Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={newCountry}
                      onChange={(e) => setNewCountry(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    className="mt-2"
                    variant="primary"
                    onClick={handleAddCountry}
                  >
                    Add Country
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>Add New State</Card.Header>
              <Card.Body>
                <Form>
                <Form.Group>
                    <Form.Label>Select Country</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedCountryId}
                      onChange={(e) => setSelectedCountryId(e.target.value)}
                    >
                      <option value="">-- Select --</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.countryName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>State Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={newState}
                      onChange={(e) => setNewState(e.target.value)}
                    />
                  </Form.Group>
                  
                  <Button
                    className="mt-2"
                    variant="primary"
                    onClick={handleAddState}
                  >
                    Add State
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3 mb-3" >
                      <Col  md={12} className="text-center"><Link to={Router.ADDPACKAGE}>
            <Button variant="primary">Package Operations</Button>
           </Link></Col>
           </Row>

        <Card>
          <Card.Header>States</Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {states.length > 0 ? (
                  states.map((state) => (
                    <tr key={state.id}>
                      <td>{state.id}</td>
                      <td>
                        {editingStateId === state.id ? (
                          <Form.Control
                            type="text"
                            value={editedStateName}
                            onChange={(e) =>
                              setEditedStateName(e.target.value)
                            }
                          />
                        ) : (
                          state.stateName
                        )}
                      </td>
                      <td>{getCountryNameById(state.countryId)}</td>
                      <td>
                        {editingStateId === state.id ? (
                          <Button
                            variant="primary"
                            onClick={() => handleUpdateState(state.id)}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            variant="Primary"
                            onClick={() => {
                              setEditingStateId(state.id);
                              setEditedStateName(state.stateName);
                            }}
                          >
                            Update
                          </Button>
                        )}
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteState(state.id)}
                          className="ms-2"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No states available.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
}

