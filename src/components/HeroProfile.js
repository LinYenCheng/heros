import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import classNames from 'classnames';

import SkillCounter from './SkillCounter';
import useCounter from '../hooks/useCounter';
import API from '../middleware/API';
import SkillChart from './SkillChart';

function HeroProfile(props) {
  const {
    match: {
      params: { heroId },
    },
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isPatching, setIsPatching] = useState(false);
  const [nowProfile, setNowProfile] = useState(false);
  const {
    count: experiencePoint,
    increment: addExperiencePoint,
    decrement: reduceExperiencePoint,
    reset: resetExperiencePoint,
  } = useCounter(0);

  const warnClass = classNames({
    'color--warn': experiencePoint !== 0,
    center: true,
  });

  const btnSummitClass = classNames({
    btn: true,
    'btn-default': true,
    'cursor--not-allowed': experiencePoint !== 0,
  });

  let blockSkillForm = '';
  let strButtonTitle = '儲存';

  useEffect(() => {
    if (isLoading) {
      API.get(`/heroes/${heroId}/profile`).then(dataProfile => {
        setNowProfile(dataProfile);
        setIsLoading(false);
        resetExperiencePoint();
      });
    }
  });

  useEffect(() => {
    if (isPatching) {
      API.patch(`/heroes/${heroId}/profile`, nowProfile).then(res => {
        if (res === 'OK') {
          Swal({
            type: 'success',
            title: '修改成功',
            showConfirmButton: false,
            showCloseButton: false,
            timer: 1000,
            onClose: () => {
              setIsPatching(false);
              setNowProfile(nowProfile);
              resetExperiencePoint();
            },
          });
        }
      });
    }
  });

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
        title: '尚有點數',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 1000,
      });
    }
  }

  if (experiencePoint !== 0) strButtonTitle = '尚有點數';

  if (nowProfile && !isLoading && !isPatching) {
    blockSkillForm = (
      <>
        <div className="col-sm-12 col-md-8">
          <div className="div--inline-block">
            {Object.keys(nowProfile).map(key => (
              <SkillCounter
                key={key}
                skill={key}
                experiencePoint={experiencePoint}
                nowProfile={nowProfile}
                setNowProfile={setNowProfile}
                addExperiencePoint={addExperiencePoint}
                reduceExperiencePoint={reduceExperiencePoint}
              />
            ))}
          </div>
          <div
            className="div--inline-block center mobile--hide"
            style={{ verticalAlign: 'top', marginLeft: '15px' }}
          >
            <SkillChart nowProfile={nowProfile} />
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="profile__form">
            <h4>
              <span>剩餘點數:</span>
              <span className={warnClass} style={{ minWidth: '40px', display: 'inline-block' }}>
                {experiencePoint}
              </span>
            </h4>
            <button
              type="button"
              className={btnSummitClass}
              title={strButtonTitle}
              onClick={patchProfile}
            >
              {strButtonTitle}
            </button>
          </div>
        </div>
      </>
    );
  }

  return <div className="row profile__container">{blockSkillForm}</div>;
}

HeroProfile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      heroId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default HeroProfile;
