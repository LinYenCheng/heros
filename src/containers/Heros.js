import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Link } from 'react-router-dom';

import '../styles/Root.scss';
import reduxAPI from '../middleware/reduxAPI';
import { validateData } from '../util/util';
import Hero from '../components/Hero';

class Heros extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(
      reduxAPI.actions.heroes.sync(() => {
        const { heroes } = this.props;
        const validatedHeros = validateData(heroes);
        if (validatedHeros) {
          console.log(validatedHeros);
        }
      }),
    );
  }

  render() {
    const {
      match: { url },
    } = this.props;
    console.log(url);
    return (
      <div className="App container">
        <h1>heros</h1>
        <Link to="/heros/1">hero 1</Link>
        <Link to="/heros/2">hero 2</Link>
        <Switch>
          <Route exact path={`${url}/:heroId`} component={Hero} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  heroes: state.heroes,
});

Heros.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps)(Heros));
