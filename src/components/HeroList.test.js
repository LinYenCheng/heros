import React from 'react';
import { MemoryRouter } from 'react-router';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import HeroList from './HeroList';

configure({ adapter: new Adapter() });

describe('shallow', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <HeroList
          match={{
            url: 'test',
          }}
        />
      </MemoryRouter>,
    );
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should render a proper heros data', done => {
    const mock = new MockAdapter(axios);
    mock.onGet('/heroes').reply(200, [{ id: 1, name: 'John Smith', image: 'test' }]);
    const component = mount(
      <MemoryRouter>
        <HeroList
          match={{
            url: 'test',
          }}
        />
      </MemoryRouter>,
    );
    setImmediate(() => {
      component.update();
      // console.log(component.debug());
      done();
    });
  });
});
