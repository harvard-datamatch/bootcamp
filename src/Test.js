import React from 'react';
import { withRouter } from 'react-router-dom';

const Test = props => {
  return <div>Test {props.match.params.id} </div>;
};

export default withRouter(Test);
