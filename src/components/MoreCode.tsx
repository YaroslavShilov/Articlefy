import React from 'react';
import './moreCode.css';
import { sum } from './math';

const MoreCode = () => {
  console.log("Hello! I'm more code block");
  console.log(sum(11, 16));
  return <div className="moreCode">this code for checking code splitting and lazy load</div>;
};

export default MoreCode;
