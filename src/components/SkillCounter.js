import React from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

function SkillCounter(props) {
  const {
    skill,
    nowProfile,
    setNowProfile,
    experiencePoint,
    addExperiencePoint,
    reduceExperiencePoint,
  } = props;

  function showAlert(text) {
    Swal({
      type: 'info',
      title: text,
      showConfirmButton: false,
      showCloseButton: true,
      timer: 1000,
    });
  }

  function addSkillPoint() {
    const tempProfile = JSON.parse(JSON.stringify(nowProfile));
    if (experiencePoint > 0) {
      tempProfile[skill] += 1;
      setNowProfile(tempProfile);
      reduceExperiencePoint();
    } else {
      showAlert('請先減少其他點數');
    }
  }

  function reduceSkillPoint() {
    const tempProfile = JSON.parse(JSON.stringify(nowProfile));
    if (tempProfile[skill] > 0) {
      tempProfile[skill] -= 1;
      setNowProfile(tempProfile);
      addExperiencePoint();
    } else {
      showAlert('點數不足');
    }
  }

  return (
    <div className="skill__container">
      <span className="skill__title">{skill}</span>
      <button type="button" className="btn skill__button" onClick={addSkillPoint}>
        <span className="glyphicon glyphicon-plus" />
      </button>
      <span className="skill__value">{nowProfile[skill]}</span>
      <button type="button" className="btn skill__button" onClick={reduceSkillPoint}>
        <span className="glyphicon glyphicon-minus" />
      </button>
    </div>
  );
}

SkillCounter.propTypes = {
  skill: PropTypes.string.isRequired,
  setNowProfile: PropTypes.func.isRequired,
  experiencePoint: PropTypes.number.isRequired,
  addExperiencePoint: PropTypes.func.isRequired,
  reduceExperiencePoint: PropTypes.func.isRequired,
  nowProfile: PropTypes.object.isRequired,
};

export default SkillCounter;
