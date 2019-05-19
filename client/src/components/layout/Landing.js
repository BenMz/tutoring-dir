import React , {Fragment} from 'react';
import {Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Landing.css';
import Navbar from './Navbar';


const Landing = () => {
  return (
    <Fragment>
  <Navbar/>
  <header className="masthead text-center text-white">
    <div className="masthead-content">
      <div className="container">
        <h1 className="masthead-heading mb-0">Get Tutoring</h1>
        <h2 className="masthead-subheading mb-0">Search for tutors, share posts and help others as well!</h2>
        <Link to="/register" className="btn btn-primary btn-xl rounded-pill mt-5">Sign up!</Link>
      </div>
    </div>
    <div className="bg-circle-1 bg-circle"></div>
    <div className="bg-circle-2 bg-circle"></div>
    <div className="bg-circle-3 bg-circle"></div>
    <div className="bg-circle-4 bg-circle"></div>
  </header>
  </Fragment>
  )
}

export default Landing;