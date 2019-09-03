import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Route, withRouter, Link, matchPath } from 'react-router-dom';

import '../styles/Root.scss';
import API from '../middleware/API';
import HeroProfile from '../containers/HeroProfile';

function HeroList(props) {
  const [heroes, setHeroes] = useState([]);
  const {
    match: { url },
  } = props;
  let blockHeros = '';
  function getHeroIdFromPath() {
    const {
      history: {
        location: { pathname },
      },
    } = props;
    let heroId = 0;
    const match = matchPath(pathname, {
      path: '/heros/:heroId',
    });

    if (match && match.params.heroId) {
      heroId = match.params.heroId;
    }
    return heroId;
  }

  useEffect(() => {
    API.get('/heroes').then(nowHeroes => {
      if (nowHeroes) {
        setHeroes(nowHeroes);
      }
    });
  }, []);

  if (heroes && heroes.length) {
    blockHeros = heroes.map(hero => {
      const { id, name, image } = hero;
      const cardClass = classNames({
        thumbnail: true,
        hero__card: true,
        'hero__card--select': getHeroIdFromPath() === id,
      });
      return (
        <Link key={id} to={`/heros/${id}`}>
          <div className="col-sm-6 col-md-3">
            <div className={cardClass}>
              <div className="card__image-container">
                <img src={image} alt="..." />
              </div>
              <div className="caption center">
                <h3>{name}</h3>
              </div>
            </div>
          </div>
        </Link>
      );
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
  history: PropTypes.object.isRequired,
};

export default withRouter(HeroList);
