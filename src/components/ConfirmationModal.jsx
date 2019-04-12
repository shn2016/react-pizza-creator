import React from 'react';
import PropTypes from 'prop-types';
import DetailsPropTypes from '../PropTypes/DetailsPropTypes';
import ProductPropTypes from '../PropTypes/ProductPropTypes';

const ComfirmationModal = ({
  selectedSize,
  selectedToppings,
  onClose,
  details: {
    name,
    address,
    postCode,
    contactNumber,
  },
}) => (
  <div className="confirmation-modal">
    <div className="modal-box">
      <h1>Your Order Details</h1>
      <address>
        <p><strong>{name}</strong></p>
        <p>{`${address} ${postCode}`}</p>
        <p>{contactNumber}</p>
      </address>
      <hr />
      <div className="pizzas">
        <div className="pizza">
          <div className="pizza-confirm-size">
            <strong>{`${selectedSize.name} Pizza`}</strong>
          </div>
          <div>&nbsp;</div>
          <div className="pizza-confirm-toppings">
            {selectedToppings.map(({ name: toppingName, amount }) => (
              <div key={toppingName}>{`${toppingName} * ${amount}`}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="actions">
        <button className="cancel" onClick={onClose} type="button">Cancel</button>
        <button className="confirm" type="button">Confirm</button>
      </div>
    </div>
  </div>
);

ComfirmationModal.propTypes = {
  selectedSize: PropTypes.shape(ProductPropTypes).isRequired,
  selectedToppings: PropTypes.arrayOf(PropTypes.shape(ProductPropTypes)).isRequired,
  onClose: PropTypes.func.isRequired,
  details: PropTypes.shape(DetailsPropTypes).isRequired,
};

export default ComfirmationModal;
