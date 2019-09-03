import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import reduxAPI from '../middleware/reduxAPI';
import SkillCounter from '../components/SkillCounter';
import { validateData } from '../util/util';

function HeroProfile(props) {
  const {
    match: {
      params: { heroId },
    },
    dispatch,
    heroProfile,
  } = props;
  const [nowProfile, setNowProfile] = useState(false);
  const [experiencePoint, setExperiencePoint] = useState(0);
  const SkillForm = styled.div`
    position: absolute;
    bottom: 0px;
    right: 15px;
  `;

  let blockSkillCounters = '';

  useEffect(() => {
    dispatch(reduxAPI.actions.heroProfile.get({ heroId }));
  }, [dispatch, heroId]);

  useEffect(() => {
    setNowProfile(validateData(heroProfile));
  }, [heroProfile]);

  function addSkillPoint(key) {
    const tempProfile = JSON.parse(JSON.stringify(nowProfile));
    if (experiencePoint > 0) {
      tempProfile[key] += 1;
      setNowProfile(tempProfile);
      setExperiencePoint(experiencePoint - 1);
    } else {
      // 提醒
    }
  }

  function reduceSkillPoint(key) {
    const tempProfile = JSON.parse(JSON.stringify(nowProfile));
    if (tempProfile[key] > 0) {
      tempProfile[key] -= 1;
      setNowProfile(tempProfile);
      setExperiencePoint(experiencePoint + 1);
    } else {
      // 提醒
    }
  }

  function patchProfile() {
    // console.log(validateData(heroProfile));
  }

  if (nowProfile) {
    // blockSkillCounters = Object.keys(nowProfile).map(key => (
    //   <SkillCounter
    //     key={key}
    //     skill={key}
    //     value={nowProfile[key]}
    //     addSkillPoint={addSkillPoint}
    //     reduceSkillPoint={reduceSkillPoint}
    //   />
    // ));
  }

  return (
    <div className="row">
      <div className="col-md-12">
        {blockSkillCounters}
        {/* <SkillForm>
          <span>剩餘點數</span>
          <span>{experiencePoint}</span>
          <button type="button" className="btn" onClick={patchProfile}>
            儲存
          </button>
        </SkillForm> */}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  heroProfile: state.heroProfile,
});

HeroProfile.propTypes = {
  match: PropTypes.object.isRequired,
  heroProfile: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps)(HeroProfile));
