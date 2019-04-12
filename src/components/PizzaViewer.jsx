import React from 'react';
import PropTypes from 'prop-types';
import ProductPropTypes from '../PropTypes/ProductPropTypes';
import board from '../images/board.svg';
import base from '../images/base.svg';

const Previewer = ({ selectedToppings }) => (
  <div className="pizza-viewer">
    <div className="pizza-container">
      <div className="pizza-board">
        <img src={board} alt="Pizza board" />
      </div>
      <div className="pizza-base">
        <img src={base} alt="Pizza base" />
      </div>
      <div className="pizza-toppings">
        {selectedToppings.map(selectedTopping => (
          <img
            key={selectedTopping.name}
            src={`https://toddmotto.com/angular-pizza-creator/assets/toppings/${selectedTopping.name}.svg`}
            alt={selectedTopping.name}
          />
        ))}
      </div>
    </div>
  </div>
);

Previewer.propTypes = {
  selectedToppings: PropTypes.arrayOf(PropTypes.shape(ProductPropTypes)).isRequired,
};

export default Previewer;
