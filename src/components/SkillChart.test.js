import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SkillChart from './SkillChart';

configure({ adapter: new Adapter() });

describe('mount', () => {
  let wrapper = mount(
    <SkillChart
      nowProfile={{
        str: 7,
        int: 7,
        agi: 7,
      }}
    />,
  );

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });
});
