import React from 'react';

const Button = ({onPlaceButtonClick, onResetButtonClick}) => {
  return (
    <div className = "section">
      <button type="submit" onClick = { () => onPlaceButtonClick()} key="placeButton">
        Place Order
      </button>
      <button type="reset" onClick = { () => onResetButtonClick()} key="resetButton">
        Clear
      </button>
    </div>
  );
}

export default Button;
