import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image1 from '../../Images/venky.jpg';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from './FooterC';

const Home = () => {
   return (
      <>
         <Navbar bg='dark' variant="dark">
            <Container>
               <Navbar.Brand style={{ color: 'white' }}>
                  <i className="bx bxs-shield-plus"></i> ResloveNow
               </Navbar.Brand>
               <ul className="navbar-nav">
                  <li className="nav-item">
                     <Link to={'/'} className="nav-link text-light">
                        <i className="bx bxs-home"></i> Home
                     </Link>
                  </li>
                  <li className="nav-item mb-1">
                     <Link to={'/signup'} className="nav-link text-light">
                        <i className="bx bx-user"></i> SignUp
                     </Link>
                  </li>
                  <li className="nav-item mb-1">
                     <Link to={'/login'} className="nav-link text-light">
                        <i className="bx bxs-log-in"></i> Login
                     </Link>
                  </li>
               </ul>
            </Container>
         </Navbar>
         <Container style={{paddingTop:'250px'
         }} className="home-container">
            <div className="left-side">
               <img src={Image1} alt="Customer Service Visual" />
            </div>
            <div  className="right-side">
               <p>
                  <span className="f-letter">Customer service represents the heart of a brand in the hearts of its customers.</span>
                  <br />
                  <span className="s-letter">Exceed Customer Expectations: Discover our</span>
                  <br />
                  <span className="t-letter">Complaint Management Solution</span>
                  <br />
                  <h6 style={{color:'white'}}>How can I help you?</h6>
                  <Link to={'/Login'}>
                     <Button className="mt-2 register">Register your Complaint</Button>
                  </Link>
               </p>
            </div>
         </Container>
         <br /><br /><br /><br /><br />
         <br /><br />
         <Footer />
      </>
   );
};

export default Home;
