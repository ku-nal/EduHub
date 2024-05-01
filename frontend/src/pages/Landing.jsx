import React from 'react';
import Navbar from '../Components/NavBar';
import LandingBody from '../Components/landing-body';
import About from '../Components/about';

const LandingPage = () => (
  <div className="landing-page">
    <Navbar pages = {["Contact Us", "FAQs", "Register", "Login"]}/>
    <LandingBody />
    <About />
    {/* <Contact/> */}
  </div>
);

export default LandingPage;
