import React from 'react';
import { withRouter } from 'react-router-dom';

function Hero(props) {
  const {
    match: {
      params: { heroId },
    },
  } = props;
  return <h2>{`hero ${heroId}`}</h2>;
}

export default withRouter(Hero);
