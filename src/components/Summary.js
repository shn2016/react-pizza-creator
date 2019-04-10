import React from 'react';


const Summary = ({
  selectedToppings, 
  selectedSize,
  onAddToppingClick,
  onMinusToppingClick,
}) => {
  return(
    <ul className="summary">
      {!!selectedSize &&
        (<li key={selectedSize}>
          <span key={"size"}>{selectedSize.name} Pizza</span>
          <span key={"1"}></span>
          <span key={"2"}></span>
          <span key={"3"}></span>
          <span key={"price"}>{selectedSize.price}</span>
        </li>)
      }
      {selectedToppings.map(selectedTopping => {
        const { name, amount, price } = selectedTopping;
        return (
          <li key={name}>
            <button 
              className = "amount" 
              onClick= { () => onAddToppingClick(selectedTopping)}
            >
              +
            </button>
            <button
              className = "amount" 
              onClick= { () => onMinusToppingClick(selectedTopping)}
            >
              -
            </button>
            <span>{name}</span>
            <span>* {amount}</span>
            <span>{price * amount}</span>
          </li>
        )
      })}
    </ul>
  )
}

export default Summary;
