import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './FooterC';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/Login', user);
      alert('Successfully logged in');
      localStorage.setItem('user', JSON.stringify(res.data));
      const isLoggedIn = JSON.parse(localStorage.getItem('user'));
      const { userType } = isLoggedIn;
      switch (userType) {
        case 'Admin':
          navigate('/AdminHome');
          break;
        case 'Ordinary':
          navigate('/HomePage');
          break;
        case 'Agent':
          navigate('/AgentHome');
          break;
        default:
          navigate('/Login');
          break;
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("User doesn't exist");
      } else {
        console.error('Login error:', err);
        alert('Login failed. Please try again.'); //Added more generic error message for other errors.
      }
      navigate('/Login');
    }
  };

  return (
    <>
      <Navbar style={{backgroundColor:'#051129', border:'2px solid aqua', borderRadius:'10px'}} bg="" variant="dark">
        <Container>
          <Navbar.Brand>
            <i className="bx bxs-shield-plus"></i>ResloveNow
          </Navbar.Brand>
          <ul className="navbar-nav">
            <li className="nav-item mb-0">
              <Link to={'/'} className={`nav-link text-light `}>
                <i className="bx bxs-home"></i>Home
              </Link>
            </li>

            <li className="nav-item mb-0">
              <Link to={'/signup'} className={`nav-link text-light `}>
                <i className="bx bx-user"></i> SignUp
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to={'/login'} className={`nav-link text-light `}>
                <i className="bx bxs-log-in"></i> Login
              </Link>
            </li>
          </ul>
        </Container>
      </Navbar>
      <section className="vh-5 gradient-custom">
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-11 col-md-10 col-lg-10 col-xl-8">
              <div className="card bg-dark text-white">
                <div style={{
                  backgroundColor:'#051129',
                  border: '2px solid aqua',
                  borderRadius:'10px',
                  boxShadow:'0 0 5px green, 0 0 20px yellowgreen, 0 0 yellowgreen, 0 0 50px yellowgreen, 0 0 10px yellowgreen',
                }} className="card-body p-3 text-center">
                  <div className="mb-md-2 mt-md-1 pb-1">
                    <h2 className="fw-bold mb-3">
                      Login For Registering the Complaint
                    </h2>
                    <p className="text-white-50 mb-3">
                      Please enter your details!
                    </p>
                    <form 
onSubmit={handleSubmit}>
                      <div className="form-outline form-white mb-2">
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          required
                        />
                        <label className="form-label" htmlFor="email">
                        <i class='bx bx-envelope'></i>  Email
                        </label>
                      </div>
                      <div className="form-outline form-white mb-3">
                        <input
                          type="password"
                          name="password"
                          value={user.password}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          autoComplete="off"
                          required
                        />
                        <label 
                        styleclassName="form-label" htmlFor="password">
                        <i class='bx bx-dialpad'></i>Password
                        </label>
                      </div>

                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Login
                      </button>
                    </form>
                  </div>
                  <div>
                    <p className="mb-0 mt-0">
                      Don't have an account? <Link to="/SignUp">SignUp</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;