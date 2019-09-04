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
    const match = matchPath(pathname, {
      path: '/heros/:heroId',
    });

    let heroId = 0;
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
      <div className="col-xs-6 col-sm-6 col-md-3 padding--mobile">
        <div className={cardClass}>
          <div className="card__image-container">
            <img src={image.replace('http', 'https')} alt="..." />
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
  hero: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default withRouter(HeroCard);
