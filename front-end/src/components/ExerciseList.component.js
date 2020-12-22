import React, { useEffect, useState } from 'react';

const ExerciseList = () => {
  const [state, setState] = useState({ name: 'usman ghani' });

  useEffect(() => {
    console.log(state.name);
  }, []);

  return <div>ExerciseList</div>;
};

export default ExerciseList;
