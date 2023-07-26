import React, { useState, useEffect } from 'react';
import './App.css';

const socket = new WebSocket('ws://localhost:8000');

function App() {
  const [text, setText] = useState('');
  useEffect(() => {
    socket.onopen = () => {
      console.log('WebSocket Connected');
    };

    socket.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);
      if (type === 'textUpdate') {
        setText(data);
      }
    };
  }, []);

  const handleChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    socket.send(JSON.stringify({ type: 'textUpdate', data: newText }));
  };

  const handleBlur = () => {};

  return (
    <div className="App">
      <h1>Text Editor</h1>
      <textarea
        rows={10}
        cols={100}
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Type Something..."
      />
    </div>
  );
}

export default App;
