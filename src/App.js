import React, { useState, useEffect } from 'react';
import './App.css';

const socket = new WebSocket('ws://localhost:8000');

function App() {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  let typingTimeout = null;

  useEffect(() => {
    socket.onopen = () => {
      console.log('WebSocket Connected');
    };

    socket.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);
      if (type === 'textUpdate') {
        setText(data);
      } else if (type === 'userTyping') {
        setIsTyping(data);
      }
    };
  }, []);

  const handleChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    clearTimeout(typingTimeout);
    socket.send(JSON.stringify({ type: 'textUpdate', data: newText }));
    if (!isTyping) {
      setIsTyping(true);
      socket.send(JSON.stringify({ type: 'userTyping', data: true }));
    }
    typingTimeout = setTimeout(() => {
      setIsTyping(false);
      socket.send(JSON.stringify({ type: 'userTyping', data: false }));
    }, 1000);
  };

  const handleBlur = () => {
    clearTimeout(typingTimeout);
    if (isTyping) {
      setIsTyping(false);
      socket.send(JSON.stringify({ type: 'userTyping', data: false }));
    }
  };

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
      {isTyping && <p>Someone is typing...</p>}
    </div>
  );
}

export default App;
