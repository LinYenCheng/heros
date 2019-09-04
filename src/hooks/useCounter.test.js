import React from 'react';
import { act, render } from '@testing-library/react';
import useCounter from './useCounter';

describe('useCounter test', () => {
  it('should get initial count', () => {
    let result;
    const Demo = function() {
      result = useCounter(0);
      return null;
    };
    render(<Demo />);
    expect(result.count).toEqual(0);
  });

  it('should get initial count through params', () => {
    let result;
    const Demo = function() {
      result = useCounter(10);
      return null;
    };
    render(<Demo />);
    expect(result.count).toEqual(10);
  });

  it('should get increase count', () => {
    let result;
    const Demo = function() {
      result = useCounter(0);
      return null;
    };
    render(<Demo />);
    act(() => {
      result.increment();
    });
    expect(result.count).toEqual(1);
  });

  it('should reset to zero', () => {
    let result;
    const Demo = function() {
      result = useCounter(10);
      return null;
    };
    render(<Demo />);
    act(() => {
      result.reset();
    });
    expect(result.count).toEqual(0);
  });
});
