import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

import '../styles/Root.scss';
import API from '../middleware/API';
import HeroProfile from './HeroProfile';
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
        Swal({
          type: 'success',
          title: '選擇英雄',
          text: '進行技能點數分配',
          showConfirmButton: false,
          showCloseButton: true,
          timer: 3000,
        });
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
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(HeroList);
