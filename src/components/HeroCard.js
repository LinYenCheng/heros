import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, matchPath, withRouter } from 'react-router-dom';

function HeroCard(props) {
  const {
    hero: { id, name, image },
  } = props;

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

  const cardClass = classNames({
    thumbnail: true,
    hero__card: true,
    'hero__card--select': getHeroIdFromPath() === id,
  });

  return (
    <Link to={`/heros/${id}`}>
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
}

HeroCard.propTypes = {
  hero: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(HeroCard);