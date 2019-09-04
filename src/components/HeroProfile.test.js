import React from 'react';
import { MemoryRouter } from 'react-router';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HeroProfile from './HeroProfile';

configure({ adapter: new Adapter() });

describe('shallow', () => {
  let wrapper = mount(
    <MemoryRouter>
      <HeroProfile
        match={{
          params: { heroId: 'test' },
        }}
      />
    </MemoryRouter>,
  );

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });
});
