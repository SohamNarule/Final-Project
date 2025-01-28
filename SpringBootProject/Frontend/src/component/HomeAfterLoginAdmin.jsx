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

//   const handleAddCountry = async () => {
//     if (newCountry.trim()) {
//       const existingCountry = countries.find(
//         (country) =>
//           country.country_name.toLowerCase() === newCountry.trim().toLowerCase()
//       );

//       if (existingCountry) {
//         setAlertMessage(`Country "${newCountry}" already exists!`);
//         setAlertVariant("warning");
//         return;
//       }
//       try {
//         const response = await axios.post(
//           "http://localhost:8080/countries/addcountry",
//           { country_name: newCountry.trim() }
//         );
//         setCountries([...countries, response.data]);
//         setNewCountry("");
//         setAlertMessage(`Country "${newCountry}" added successfully!`);
//         setAlertVariant("success");
//         getAllCountries();
//       } catch (error) {
//         console.error(error);
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
//       console.log(newState)
//       const existingState = states.find(
//         (state) =>
//           state.name && state.name.toLowerCase() === newState.trim().toLowerCase() &&
//           state.countryId === countryId
//       );


//       if (existingState) {
//         setAlertMessage(`State "${newState}" already exists in this country!`);
//         setAlertVariant("warning");
//         return;
//       }

//       try {
//         const newId =
//           states.length > 0 ? Math.max(...states.map((s) => s.id)) + 1 : 1;
//         const response = await axios.post(
//           "http://localhost:8080/states/addstate",
//           {
//             countryId: selectedCountryId,
//             stateName: newState.trim(),
//           }
//         );
//         setStates([
//           ...states,
//           {
//             id: newId,
//             name: newState.trim(),
//             countryId: parseInt(selectedCountryId),
//           },
//         ]);
//         setNewState("");
//         setSelectedCountryId("");
//         setAlertMessage(`State "${newState}" added successfully!`);
//         setAlertVariant("success");
//         getAllStates();
//       } catch (error) {
//         console.error(error);
//         setAlertMessage("Failed to add state. Please try again.");
//         setAlertVariant("danger");
//       }
//     } else {
//       setAlertMessage("State name or country selection cannot be empty!");
//       setAlertVariant("danger");
//     }
//   };

//   const getAllCountries = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/countries");
//       setCountries(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getAllStates = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/states/allstates");
//       console.log(response.data);
//       setStates(response.data);
//     } catch (error) {
//       console.error(error);
//     }
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
//                 <Table striped bordered hover responsive >
//                   <thead>
//                     <tr>
//                       <th>ID</th>
//                       <th>Country</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {countries.map((country) => (
//                       <tr key={country.id}>
//                         <td>{country.id}</td>
//                         <td>{country.country_name}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Card.Body>
//             </Card>
//           </Col>

//           <Col md={6}>
//             {/* Add Country Form */}
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
//                   <Button variant="primary" onClick={handleAddCountry}>
//                     Add Country
//                   </Button>
//                 </Form>
//               </Card.Body>
//             </Card>

//             {/* Add State Form */}
//             <Card className="mb-4">
//               <Card.Header>Add a New State</Card.Header>
//               <Card.Body>
//                 <Form>
//                   <Form.Group controlId="formCountryId" className="mb-3">
//                     <Form.Label>Country ID</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter country ID"
//                       value={selectedCountryId}
//                       onChange={(e) => setSelectedCountryId(e.target.value)}
//                     />
//                   </Form.Group>
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

//         {/* States Table */}
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
//                   {/* <tbody>
//                     {states.map((state) => {
//                       const country = countries.find(
//                         (c) => c.id === state.countryId
                        
//                       );
//                       return (
//                         <tr key={state.id}>
//                           <td>{state.id}</td>
//                           <td>{state.name}</td>
//                           <td>{country ? country.country_name : "Unknown"}</td>
//                         </tr>
//                       );
//                     })}
//                   </tbody> */}
//                   <tbody>
//                     {states.map((state, index) => (
//                       <tr key={index}>
//                         <td>{index + 1}</td>
//                         <td>{state.stateName}</td>
//                         <td>{state.countryName}</td>
//                       </tr>
//                     ))}
//                   </tbody>

//                 </Table>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         <Row md={6} className="mt-3">
//           <Link to={Router.ADDPACKAGE}>
//             <Button variant="primary">Add Package</Button>
//           </Link>
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
  useEffect(() => {
     getAllCountries();
     getAllStates();
    {
      console.log(countries);
    }
  }, []);

  const handleAddCountry = async () => {
    if (newCountry.trim()) {
      const existingCountry = countries.find(
        (country) =>
          country.country_name.toLowerCase() === newCountry.trim().toLowerCase()
      );

      if (existingCountry) {
        setAlertMessage(`Country "${newCountry}" already exists!`);
        setAlertVariant("warning");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:8080/countries/addcountry",
          { country_name: newCountry.trim() }
        );
        setCountries([...countries, response.data]);
        setNewCountry("");
        setAlertMessage(`Country "${newCountry}" added successfully!`);
        setAlertVariant("success");
        getAllCountries();
      } catch (error) {
        console.error(error);
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
      console.log(newState);
      const existingState = states.find(
        (state) =>
          state.name &&
          state.name.toLowerCase() === newState.trim().toLowerCase() &&
          state.countryId === countryId
      );

      if (existingState) {
        setAlertMessage(`State "${newState}" already exists in this country!`);
        setAlertVariant("warning");
        return;
      }

      try {
        const newId =
          states.length > 0 ? Math.max(...states.map((s) => s.id)) + 1 : 1;
        const response = await axios.post(
          "http://localhost:8080/states/addstate",
          {
            countryId: selectedCountryId,
            stateName: newState.trim(),
          }
        );
        setStates([
          ...states,
          {
            id: newId,
            name: newState.trim(),
            countryId: parseInt(selectedCountryId),
          },
        ]);
        setNewState("");
        setSelectedCountryId("");
        setAlertMessage(`State "${newState}" added successfully!`);
        setAlertVariant("success");
        getAllStates();
      } catch (error) {
        console.error(error);
        setAlertMessage("Failed to add state. Please try again.");
        setAlertVariant("danger");
      }
    } else {
      setAlertMessage("State name or country selection cannot be empty!");
      setAlertVariant("danger");
    }
  };

  const getAllCountries = async () => {
    try {
      const response = await axios.get("http://localhost:8080/countries");
      console.log(response.data);
      setCountries(response.data);
      console.log(countries);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllStates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/states/allstates"
      );
      console.log(response.data);
      setStates(response.data);
    } catch (error) {
      console.error(error);
    }
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
                    </tr>
                  </thead>
                  <tbody>
                    {countries.map((country) => (
                      <tr key={country.id}>
                        <td>{country.id}</td>
                        <td>{country.country_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            {/* Add Country Form */}
            <Card className="mb-4">
              <Card.Header>Add a New Country</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formCountry" className="mb-3">
                    <Form.Label>Country Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter country name"
                      value={newCountry}
                      onChange={(e) => setNewCountry(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="success" onClick={handleAddCountry}>
                    Add Country
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <Form.Group controlId="formSelectCountry" className="mb-3">
              <Form.Label>Select Country</Form.Label>
              <Form.Select
                value={selectedCountryId}
                onChange={(e) => setSelectedCountryId(e.target.value)}
              >
                {console.log(countries)}
                <option value="">Choose a country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.country_name}
                    {console.log(country.name)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {/* Add State Form */}
            <Card className="mb-4">
              <Card.Header>Add a New State</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formState" className="mb-3">
                    <Form.Label>State Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter state name"
                      value={newState}
                      onChange={(e) => setNewState(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="success" onClick={handleAddState}>
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
        {/* States Table */}
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>States</Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>State</th>
                      <th>Country</th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    {states.map((state) => {
                      const country = countries.find(
                        (c) => c.id === state.countryId
                        
                      );
                      return (
                        <tr key={state.id}>
                          <td>{state.id}</td>
                          <td>{state.name}</td>
                          <td>{country ? country.country_name : "Unknown"}</td>
                        </tr>
                      );
                    })}
                  </tbody> */}
                  <tbody>
                    {states.map((state, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{state.stateName}</td>
                        <td>{state.countryName}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

       
      </Container>
      <Footer />
    </div>
  );
}
