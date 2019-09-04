import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SkillCounter from './SkillCounter';

configure({ adapter: new Adapter() });

describe('mount', () => {
  const setNowProfile = jest.fn();
  const reduceExperiencePoint = jest.fn();
  const addExperiencePoint = jest.fn();
  let wrapper = mount(
    <SkillCounter
      skill="test"
      nowProfile={{ test: 2 }}
      experiencePoint={5}
      setNowProfile={setNowProfile}
      addExperiencePoint={addExperiencePoint}
      reduceExperiencePoint={reduceExperiencePoint}
    />,
  );

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });

  wrapper.find('.glyphicon-plus').simulate('click');
  wrapper.find('.glyphicon-minus').simulate('click');

  wrapper = mount(
    <SkillCounter
      skill="test"
      nowProfile={{ test: 0 }}
      experiencePoint={0}
      setNowProfile={setNowProfile}
      addExperiencePoint={addExperiencePoint}
      reduceExperiencePoint={reduceExperiencePoint}
    />,
  );

  wrapper.find('.glyphicon-plus').simulate('click');
  wrapper.find('.glyphicon-minus').simulate('click');
});
