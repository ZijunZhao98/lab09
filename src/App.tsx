import React, { useState } from 'react'
import Quiz from './components/Quiz.tsx'

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div className='App'>
      <h1>My React Quiz</h1>
      <Quiz />
    </div>
  );
}

export default App;

