import React from 'react';
import { Link } from 'react-router-dom';
import aboutImage from '../assets/images/about.svg';
import CustomButton from './button';
import CustomHeading from './heading';

const About = () => (
  <div className="md:min-h-screen flex flex-col-reverse md:flex-row items-center gap-5 md:mx-32 mx-5 mt-14">
    <div className="w-full md:w-2/4">
      <img src={aboutImage} alt="about-img" />
    </div>

    <div className="w-full md:w-2/4 text-center space-y-2">
      <CustomHeading title1="About" title2="EduHub" />
      <hr></hr>

      <p className="text-lg font-semibold mb-4">
        EduHub is a comprehensive platform for tutors and students alike. Tutors can easily create and manage courses, tailoring the content to their expertise and teaching style.
      </p>
      <br></br>
      <p className="text-lg font-semibold mb-8">
        Students benefit from a user-friendly interface and a wide range of courses and educational materials.
        They can learn at their own pace, making for a personalized learning experience.
      </p>
      <br></br>

      <Link to="register">
        <CustomButton title="Explore Now" />
      </Link>
    </div>
  </div>
);

export default About;
