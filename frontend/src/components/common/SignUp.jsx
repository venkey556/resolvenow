import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './FooterC'
const SignUp = () => {
   const [title, setTitle] = useState("Select User")
   const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      phone: "",
      userType: ""
   })
   const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value })
   }

   const handleTitle = (select) => {
      setTitle(select)
      setUser({ ...user, userType: select });
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      const updatedUser = { ...user, userType: title };
      axios.post("http://localhost:8000/SignUp", updatedUser)
         .then((res) => {
            alert("record submitted")
            JSON.stringify(res.data.user)
         })
         .catch((err) => {
            console.log(err)
         })
      setUser({
         name: "",
         email: "",
         password: "",
         phone: "",
         userType: ""
      })
   }
   return (
      <>
         <Navbar bg="dark" variant="dark">
            <Container>
               <Navbar.Brand></Navbar.Brand>
               <ul className="navbar-nav">
                  <li className="nav-item mb-2">
                     <Link to={'/'}
                        className={`nav-link text-light `}
                     >
                     <i class='bx bxs-home'></i>    Home
                     </Link>
                  </li>
                  <li className="nav-item mb-2">
                     <Link
                     to={'/signup'}
                        className={`nav-link text-light `}
                     >
                       <i class='bx bx-user' ></i> SignUp
                     </Link>
                  </li>
                  <li className="nav-item mb-2">
                     <Link
                     to={'/login'}
                        className={`nav-link text-light `}
                     >
                       <i class='bx bxs-log-in'></i>  Login
                     </Link>
                  </li>
               </ul>
            </Container>
         </Navbar>
         <section className="gradient-custom">
            <div className="container">
               <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-8 col-lg-12 col-xl-5">
                     <div className="card bg-dark text-white">
                        <div style={{
                  border: '2px solid aqua',
                  borderRadius:'10px',
                  boxShadow:'0 0 5px green, 0 0 20px yellowgreen, 0 0 yellowgreen, 0 0 50px yellowgreen, 0 0 10px yellowgreen',

                }}className="card-body p-8 text-center">
                           <div className="mb-md-10 mt-md-10 pb-10">
                              <h2 className="fw-bold mb-4 ">SignUp For Registering the Complaint</h2>
                              <p className="text-white-50 mb-4">Please enter your Details</p>
                              <form style={{
                     width:'100%',
                     margin:'20px auto',
         
               
                  }}onSubmit={handleSubmit}>
                                 <div className="form-outline form-white mb-2">
                                    <input type="name" name="name" value={user.name} onChange={handleChange} className="form-control form-control-lg" required />
                                    <label className="form-label" htmlFor="name">Full Name</label>
                                 </div>
                                 <div className="form-outline form-white mb-2">
                                    <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control form-control-lg" required />
                                    <label className="form-label" htmlFor="email"> <i class='bx bx-envelope'></i>Email</label>
                                 </div>
                                 <div className="form-outline form-white mb-2">
                                    <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control form-control-lg" required />
                                    <label className="form-label" htmlFor="password"><i class='bx bx-dialpad'></i>Password</label>
                                 </div>
                                 <div className="form-outline form-white mb-2">
                                    <input type="phone" name="phone" value={user.phone} onChange={handleChange} className="form-control form-control-lg" required />
                                    <label className="form-label" htmlFor="mobile"><i class='bx bx-mobile-alt'></i>Mobile No.</label>
                                 </div>
                                 <div className="form-outline form-white mb-2">
                                    <Dropdown>
                                       <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                          {title}
                                       </Dropdown.Toggle>

                                       <Dropdown.Menu>
                                          <Dropdown.Item onClick={() => handleTitle("Ordinary")}>Ordinary</Dropdown.Item>
                                          <Dropdown.Item onClick={() => handleTitle("Admin")}>Admin</Dropdown.Item>
                                          <Dropdown.Item onClick={() => handleTitle("Agent")}>Agent</Dropdown.Item>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                    <label className="form-label" htmlFor="mobile">Select User Type</label>
                                 </div>
                                 <button className="btn btn-outline-light btn-lg px-2 mt-2" type="submit">Register</button>
                              </form>
                           </div>
                           <div>
                              <p className="mb-0">Had an account?<Link to={"/Login"}>Login</Link></p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <Footer/>
      </>
   )
}

export default SignUp
