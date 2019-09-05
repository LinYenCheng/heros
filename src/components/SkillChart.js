import React from 'react';
import PropTypes from 'prop-types';
import { RadarChart, CircularGridLines } from 'react-vis';

function changeObjectKeyToUpperCase(obj) {
  const objTemp = {};
  Object.keys(obj).forEach(key => {
    objTemp[key.toUpperCase()] = obj[key];
  });
  return objTemp;
}

function SkillChart(props) {
  const { nowProfile } = props;
  const skills = Object.keys(nowProfile);
  const maxValue = Math.max(...skills.map(skill => nowProfile[skill]));
  const DATA = [changeObjectKeyToUpperCase(nowProfile)];
  const DOMAIN = skills.map(skill => ({
    name: skill.toUpperCase(),
    domain: [0, maxValue],
    tickFormat: t => parseInt(t, 10),
  }));

  return (
    <RadarChart
      data={DATA}
      domains={DOMAIN}
      color="#00bea4"
      margin={{
        left: 30,
        top: 30,
        bottom: 30,
        right: 30,
      }}
      width={250}
      height={250}
    >
      <CircularGridLines tickValues={[...new Array(maxValue)].map((v, i) => i / 10 - 1)} />
    </RadarChart>
  );
}

SkillChart.propTypes = {
  nowProfile: PropTypes.object.isRequired,
};

export default SkillChart;
