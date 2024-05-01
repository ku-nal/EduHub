import React from 'react';
import heroImage from '../assets/images/hero.svg';

const LandingBody = () => (
  <div className="flex flex-col md:flex-row md:justify-between items-center mx-5">
    <div className="mb-8 md:mb-0 md:w-full lg:w-2/4 text-center">
      <h2 className="text-4xl md:text-6xl lg:text-6xl font-extrabold leading-tight text-black-600 mb-6">
        <span className="text-5xl">Explore with</span>
        <br className="hidden md:inline" />
        <span className="text-indigo-500 text-5xl"> EduHub</span>
      </h2>
      <br></br>
      <p className="mt-4 mb-8 md:mb-10 text-lg md:text-xl lg:text-xl leading-relaxed font-semibold text-4xl">
        Join a hub of
        <span className="text-blue-400"> exploration, creativity, </span>
        and
        <span className="text-pink-400"> academic brilliance. </span>

        <span className="text-green-400">
            &nbsp;Begin your educational adventure with EduHub.
        </span>
          &nbsp;Your journey starts here! 🔐
      </p>

      <p className="text-black text-2xl font-bold mt-8 md:mt-12">
        💡 Ignite Your Passion 💪
      </p>
    </div>

    <div className="w-full md:w-2/4 mt-8 md:mt-0 md:ml-8">
      <img src={heroImage} alt="hero" className="mx-auto rounded-lg shadow-lg" />
    </div>
  </div>
);

export default LandingBody;
