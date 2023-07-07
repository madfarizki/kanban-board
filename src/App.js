import React from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/v1', { replace: true });
  }, [navigate]);

  return (
    <Home />
  );
}

export default App;
