import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMessage('Failed to fetch message from server');
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + TypeScript + Express</h1>
        <p>Server says: {message}</p>
      </header>
    </div>
  );
}

export default App;