/* eslint-disable react/prop-types */
import React from 'react';

const Heading = ({ title1 = '', title2 = '' }) => (
  <div>
    <h3 className=" text-4xl font-semibold">
      {title1} <span className="text-indigo-500">{title2}</span>
    </h3>
  </div>
);

export default Heading;
