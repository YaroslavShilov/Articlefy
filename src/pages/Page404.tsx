import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div>
      <h1>Page 404</h1>
      <p>
        <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default Page404;
