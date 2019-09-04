import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import SkillCounter from '../components/SkillCounter';
import API from '../middleware/API';

function HeroProfile(props) {
  const {
    match: {
      params: { heroId },
    },
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isPatching, setIsPatching] = useState(false);
  const [nowProfile, setNowProfile] = useState(false);
  const [experiencePoint, setExperiencePoint] = useState(0);
  const SkillForm = styled.div`
    position: absolute;
    bottom: 0px;
    right: 15px;
  `;

  let blockSkillForm = '';

  useEffect(() => {
    if (isLoading) {
      API.get(`/heroes/${heroId}/profile`).then(dataProfile => {
        setNowProfile(dataProfile);
        setIsLoading(false);
        setExperiencePoint(0);
      });
    }
  }, [isLoading, heroId]);

  useEffect(() => {
    if (isPatching) {
      const dataProfile = JSON.parse(JSON.stringify(nowProfile));
      API.patch(`/heroes/${heroId}/profile`, dataProfile).then(res => {
        // console.log(res);
        setIsPatching(false);
        setNowProfile(dataProfile);
        if (res === 'OK') {
          setIsPatching(false);
          setExperiencePoint(0);
        }
      });
    }
  }, [isPatching, heroId]);

  useEffect(() => {
    setIsLoading(true);
  }, [heroId]);

  function patchProfile() {
    if (experiencePoint === 0) {
      setIsPatching(true);
    } else {
      // 提醒
      Swal({
        type: 'info',
        title: '尚有剩餘點數',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 1000,
      });
    }
  }

  if (nowProfile && !isLoading && !isPatching) {
    blockSkillForm = (
      <>
        {Object.keys(nowProfile).map(key => (
          <SkillCounter
            key={key}
            skill={key}
            experiencePoint={experiencePoint}
            nowProfile={nowProfile}
            setNowProfile={setNowProfile}
            setExperiencePoint={setExperiencePoint}
          />
        ))}
        <SkillForm>
          <h4>
            <span>{`剩餘點數: ${experiencePoint}`}</span>
          </h4>
          <button type="button" className="btn btn-default" onClick={patchProfile}>
            儲存
          </button>
        </SkillForm>
      </>
    );
  }

  return (
    <div className="row">
      <div className="col-md-12">{blockSkillForm}</div>
    </div>
  );
}

HeroProfile.propTypes = {
  match: PropTypes.object.isRequired,
};

export default HeroProfile;
