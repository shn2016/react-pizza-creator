import React from 'react';

export default ({
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
    <div className="modal">
      <div className="modal-box">
        <h1>Your Order Details</h1>
        <address>
          <p><strong>{name}</strong></p>
          <p>{address} {postCode}</p>
          <p>{contactNumber}</p>
        </address>
        <hr />
        <div className="pizzas">
          <div className="pizza">
            <div className="pizza-confirm-size">
              <strong>{selectedSize.name} Pizza</strong>
            </div>
            <div className="pizza-confirm-toppings">
              {selectedToppings.map(({ name, amount }) => (
                <div key={name}>{name} * {amount}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="actions">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="confirm">Confirm</button>
        </div>
      </div>
    </div>
  </div>
)