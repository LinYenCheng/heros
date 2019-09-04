import { useState } from 'react';

function useCounter(initial) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  return { reset, count, increment, decrement };
}

export default useCounter;
