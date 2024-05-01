/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/no-unknown-property */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
export const Email = ({value, fn}) => (
  <div>
    <label className="block text-gray-700 font-semibold">Email Address</label>
    <input
      type="email"
      name=""
      id=""
      value = {value}
      onChange = {(e) => {fn(e.target.value)}}
      placeholder="Enter Email Address"
      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border border-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
      autoFocus
      required
    />
  </div>
);

export const Pwd = ({value, fn}) => (
  <div className="mt-4">
    <label className="block text-gray-700 font-semibold">Password</label>
    <input
      type="password"
      name=""
      id=""
      value = {value}
      onChange={(e)=>{fn(e.target.value)}}
      placeholder="Enter Password"
      minLength="8"
      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border border-gray-700 focus:border-blue-500
                focus:bg-white focus:outline-none"
      required
    />
  </div>
);

export const GoogleSignIn = () => (
  <button
    type="button"
    className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
  >
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        className="w-6 h-6"
        viewBox="0 0 48 48"
      >
        <defs>
          <path
            id="a"
            d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
          />
        </defs>
        <clipPath id="b">
          <use xlinkHref="#a" overflow="visible" />
        </clipPath>
        <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
        <path
          clipPath="url(#b)"
          fill="#EA4335"
          d="M0 11l17 13 7-6.1L48 14V0H0z"
        />
        <path
          clipPath="url(#b)"
          fill="#34A853"
          d="M0 37l30-23 7.9 1L48 0v48H0z"
        />
        <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
      </svg>
      <span className="ml-4">Log in with Google</span>
    </div>
  </button>
);

export const CreateAccount = () => (
  <p className="mt-8">
    Need an account?
    <Link
      to="/register"
      className="text-blue-500 hover:text-blue-700 font-semibold"
    >
      Create an account
    </Link>
  </p>
);
