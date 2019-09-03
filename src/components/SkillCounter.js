import React from 'react';

function SkillCounter(props) {
  const { skill, value, addSkillPoint, reduceSkillPoint } = props;

  function addPoint() {
    addSkillPoint(skill);
  }

  function reducePoint() {
    reduceSkillPoint(skill);
  }

  return (
    <div className="skill__container">
      <span className="skill__title">{skill}</span>
      <button type="button" className="btn skill__button" onClick={addPoint}>
        <span className="glyphicon glyphicon-plus" />
      </button>
      <span className="skill__value">{value}</span>
      <button type="button" className="btn skill__button" onClick={reducePoint}>
        <span className="glyphicon glyphicon-minus" />
      </button>
    </div>
  );
}

export default SkillCounter;
