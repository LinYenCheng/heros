import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';

import '../styles/Root.scss';
import API from '../middleware/API';
import HeroProfile from '../containers/HeroProfile';
import HeroCard from './HeroCard';

function HeroList(props) {
  const [heroes, setHeroes] = useState([]);
  const {
    match: { url },
  } = props;
  let blockHeros = '';

  useEffect(() => {
    API.get('/heroes').then(nowHeroes => {
      if (nowHeroes) {
        setHeroes(nowHeroes);
      }
    });
  }, []);

  if (heroes && heroes.length) {
    blockHeros = heroes.map(hero => {
      const { id } = hero;
      return <HeroCard key={id} hero={hero} />;
    });
  }
  return (
    <div className="container">
      <br />
      <div className="row">{blockHeros}</div>
      <Route path={`${url}/:heroId`} component={HeroProfile} />
    </div>
  );
}

HeroList.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(HeroList);
