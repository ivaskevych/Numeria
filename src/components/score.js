import React from 'react';

const Score = ({value, size}) => (
  <div>
    Your score: { value }  { size && `| Best score: ${size}` }
  </div>
);

export default Score;
