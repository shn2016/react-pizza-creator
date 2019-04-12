import React from 'react';
import PropTypes from 'prop-types';
import ProductPropTypes from '../PropTypes/ProductPropTypes';


const Summary = ({
  selectedToppings,
  selectedSize,
  onAddToppingClick,
  onMinusToppingClick,
}) => (
  <ul className="summary">
    {!!selectedSize
      && (
        <li key={selectedSize}>
          <span key="size">
            {`${selectedSize.name} Pizza`}
          </span>
          <span key="1" />
          <span key="2" />
          <span key="3" />
          <span key="price">{selectedSize.price}</span>
        </li>
      )
    }
    {selectedToppings.map((selectedTopping) => {
      const { name, amount, price } = selectedTopping;
      return (
        <li key={name}>
          <button
            className="amount"
            onClick={() => onAddToppingClick(selectedTopping)}
            type="button"
          >
            +
          </button>
          <button
            className="amount"
            onClick={() => onMinusToppingClick(selectedTopping)}
            type="button"
          >
            -
          </button>
          <span>{name}</span>
          <span>{`* ${amount}`}</span>
          <span>{price * amount}</span>
        </li>
      );
    })}
  </ul>
);

Summary.defaultProps = {
  selectedSize: undefined,
};

Summary.propTypes = {
  selectedToppings: PropTypes.arrayOf(PropTypes.shape(ProductPropTypes)).isRequired,
  selectedSize: PropTypes.shape(ProductPropTypes),
  onAddToppingClick: PropTypes.func.isRequired,
  onMinusToppingClick: PropTypes.func.isRequired,
};

export default Summary;
