/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';

export const FirstName = ({value, fn}) => (
<div className="mt-6">
  <label className="block text-gray-700 font-semibold">First Name</label>
  <input
    type="text"
    name="firstName"
    id="firstName"
    value={value}
    onChange={(e) => fn(e.target.value)}
    placeholder="Enter First Name"
    pattern="[A-Za-z]+"
    title="First Name must contain only alphabetic characters"
    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border border-gray-700 focus:border-blue-500
              focus:bg-white focus:outline-none"
    required
  />
</div>
);

export const LastName = ({value,fn}) => (
<div className="mt-6">
  <label className="block text-gray-700 font-semibold">Last Name</label>
  <input
    type="text"
    name="lastName"
    id="lastName"
    placeholder="Enter Last Name"
    pattern="[A-Za-z]+"
    title="Last Name must contain only alphabetic characters"
    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border border-gray-700 focus:border-blue-500
              focus:bg-white focus:outline-none"
    value={value}
    onChange={(e) => fn(e.target.value)}
    required
  />
</div>
);

export const SignUp = () => (
  <button
    type="submit"
    className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
  >
    Sign Up
  </button>
);

export const SignInInstead = () => (
  <p className="mt-8">
    Already have an account?{' '}
    <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
      Sign In
    </Link>
  </p>
);
