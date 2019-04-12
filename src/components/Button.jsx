import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onPlaceButtonClick, onResetButtonClick }) => (
  <div className="section">
    <button type="submit" onClick={() => onPlaceButtonClick()} key="placeButton">
      Place Order
    </button>
    <button type="reset" onClick={() => onResetButtonClick()} key="resetButton">
      Clear
    </button>
  </div>
);

export default Button;

Button.propTypes = {
  onPlaceButtonClick: PropTypes.func.isRequired,
  onResetButtonClick: PropTypes.func.isRequired,
};
