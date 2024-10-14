import React from 'react';

const VisualKeyboard = ({ onKeyPress }) => {
  const buttons = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'Backspace'
  ];

  const handleKeyPress = key => {
    if (key === 'Backspace') {
      onKeyPress(key);
    } else if (key.length === 1) {
      onKeyPress(key);
    }
  };

  return (
    <div className="visual-keyboard">
      {buttons.map((key, index) => (
        <button key={index} onClick={() => handleKeyPress(key)}>
          {key}
        </button>
      ))}
    </div>
  );
};

export default VisualKeyboard;
