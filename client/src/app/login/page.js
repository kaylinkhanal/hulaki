'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/footer/page';

const Register = () => {
  const [num, setNum] = useState(10);

  const handleInc = (action) => {
    if (action === 'increment') {
      setNum((prevNum) => prevNum + 1);
    } else if (action === 'decrement' && num > 0) {
      setNum((prevNum) => prevNum - 1);
    }
  };

  return (
    <div>
      <button onClick={() => handleInc('decrement')}>-</button>
      {num}
      <button onClick={() => handleInc('increment')}>+</button>
      <input type='text'></input>
    </div>
  );
};

export default Register;
