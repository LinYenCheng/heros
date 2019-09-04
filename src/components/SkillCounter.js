import React from 'react';
import Swal from 'sweetalert2';

function SkillCounter(props) {
  const { skill, nowProfile, experiencePoint, setNowProfile, setExperiencePoint } = props;

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
      setExperiencePoint(experiencePoint - 1);
    } else {
      showAlert('請先減少其他點數');
    }
  }

  function reduceSkillPoint() {
    const tempProfile = JSON.parse(JSON.stringify(nowProfile));
    if (tempProfile[skill] > 0) {
      tempProfile[skill] -= 1;
      setNowProfile(tempProfile);
      setExperiencePoint(experiencePoint + 1);
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

export default SkillCounter;
