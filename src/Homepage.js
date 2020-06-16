import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => (
  <div>
    <h2>Homepage</h2>
    <Link to="/editor">Card Editor</Link>
    <br />
    <Link to="/viewer">Card Viewer</Link>
  </div>
);

export default Homepage;
