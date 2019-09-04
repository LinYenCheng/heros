import React from 'react';
import { MemoryRouter } from 'react-router';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HeroCard from './HeroCard';

configure({ adapter: new Adapter() });

describe('mount', () => {
  let wrapper = mount(
    <MemoryRouter>
      <HeroCard
        hero={{
          id: 'test',
          name: 'test',
          image: 'test',
        }}
      />
    </MemoryRouter>,
  );

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });
});
