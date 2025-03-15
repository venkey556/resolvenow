import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import ChatWindow from '../common/ChatWindow';
import Footer from '../common/FooterC'

const AgentHome = () => {
   const style = {
      marginTop: '66px',
   }

   const navigate = useNavigate();
   const [userName, setUserName] = useState('');
   const [toggle, setToggle] = useState({})
   const [agentComplaintList, setAgentComplaintList] = useState([]);

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               const { _id, name } = user;
               setUserName(name);
               const response = await axios.get(`http://localhost:8000/allcomplaints/${_id}`);
               const complaints = response.data;
               setAgentComplaintList(complaints);
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };

      getData();
   }, [navigate]);

   const handleStatusChange = async (complaintId) => {
      try {
         await axios.put(`http://localhost:8000/complaint/${complaintId}`, { status: 'completed' });
         setAgentComplaintList((prevComplaints) =>
            prevComplaints.map((complaint) =>
               complaint._doc.complaintId === complaintId ? { ...complaint, _doc: { ...complaint._doc, status: 'completed' } } : complaint
            )
         );
      } catch (error) {
         console.log(error);
      }
   };

   const handleToggle = (complaintId) => {
      setToggle((prevState) => ({
         ...prevState,
         [complaintId]: !prevState[complaintId],
      }));
   };

   const LogOut = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   return (
      <>
         <div className="body">
            <Navbar className="text-white" bg="dark" expand="lg">
               <Container fluid>
                  <Navbar.Brand className="text-white">
                     Hi Agent {userName}
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="navbarScroll" />
                  <Navbar.Collapse id="navbarScroll">
                     <Nav className="text-white me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <NavLink style={{ textDecoration: 'none' }} className="text-white">
                        <i class='bx bx-message-dots'></i> View Complaints
                        </NavLink>
                     </Nav>
                     <Button onClick={LogOut} variant="outline-danger">
                     <i class='bx bxs-log-out'></i> Log out
                     </Button>
                  </Navbar.Collapse>
               </Container>
            </Navbar>
            <div className="container" style={{ display: 'flex', flexWrap: 'wrap', margin: '20px' }}>
               {agentComplaintList && agentComplaintList.length > 0 ? (
                  agentComplaintList.map((complaint, index) => {
                     const open = toggle[complaint._doc.complaintId] || false;
                     return (
                        <Card key={index} style={{ width: '18rem', margin: '15px', border: '2px solid aqua',
                           borderRadius:'10px',
                           boxShadow:'0 0 5px green, 0 0 20px yellowgreen, 0 0 yellowgreen, 0 0 50px yellowgreen, 0 0 10px yellowgreen', backgroundColor:'#051129', color:'white' }}>
                           <Card.Body>
                              <Card.Title><b>Name:</b> {complaint.name}</Card.Title>
                              <Card.Text><b>Address:</b> {complaint.address}</Card.Text>
                              <Card.Text><b>City:</b> {complaint.city}</Card.Text>
                              <Card.Text><b>State:</b> {complaint.state}</Card.Text>
                              <Card.Text><b>Pincode:</b> {complaint.pincode}</Card.Text>
                              <Card.Text><b>Comment:</b> {complaint.comment}</Card.Text>
                              <Card.Text><b>Status:</b> {complaint._doc.status}</Card.Text>

                              {complaint.status !== 'completed' && (
                                 <Button onClick={() => handleStatusChange(complaint._doc.complaintId)} variant="primary">
                                    Status Change
                                 </Button>
                              )}
                              <Button onClick={() => handleToggle(complaint._doc.complaintId)}
                                 aria-controls={`collapse-${complaint._doc.complaintId}`}
                                 aria-expanded={!open} className='mx-3' variant="primary">
                                 Message
                              </Button>
                              <div>
                                 <Collapse in={!open} dimension="width">
                                    <div id="example-collapse-text">
                                       <Card body style={{ width: '250px', marginTop: '12px', border: '2px solid aqua',
                  borderRadius:'10px', backgroundColor:'aqua', color:'black' }}>
                                          <ChatWindow key={complaint._doc.complaintId} complaintId={complaint._doc.complaintId} name={userName} />
                                       </Card>
                                    </div>
                                 </Collapse>
                              </div>

                           </Card.Body>
                        </Card>
                     );
                  })
               ) : (
                  <Alert variant="info">
                     <Alert.Heading>No complaints to show</Alert.Heading>
                  </Alert>
               )}
            </div>
         </div>
         <Footer style={style}/>
      </>
   );
};

export default AgentHome;



