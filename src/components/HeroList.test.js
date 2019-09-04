import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HeroList from './HeroList';

configure({ adapter: new Adapter() });

describe('mount', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HeroList />);
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });
});
