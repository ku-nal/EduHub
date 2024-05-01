import React from 'react';
import Logo from '../assets/images/login-img.png';
import SignUpForm from '../Components/signup-form';

const SignUp = () => (
  <section className="flex justify-center items-center h-screen">
    <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
      <img
        src={Logo}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex items-center justify-center w-full md:w-1/2 xl:w-1/3">
      <SignUpForm />
    </div>
  </section>
);

export default SignUp;
