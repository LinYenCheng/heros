import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Heros from './Heros';

configure({ adapter: new Adapter() });

describe('mount', () => {
  const middleWares = [thunk];
  const mockStore = configureStore(middleWares);
  const initialState = {};
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<Heros store={store} />);
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });
});
