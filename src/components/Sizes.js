import React from 'react';
import pizza from '../images/pizza.svg';


const Sizes = ({ 
  pizzaSizes, 
  selectedSize, 
  onPizzaSizeSelected,
  sizeError
}) => 
  (
    <div className='size'>
      <div className='pizza-size' key='pizza-size'>
        {pizzaSizes.map(pizzaSize => {
          const { name, size } = pizzaSize;
          return (
            <div
              className = {`img ${name} ${(selectedSize && name === selectedSize.name)? 'active' : null}`}
              onClick= { () => onPizzaSizeSelected(pizzaSize)}
              key= {name}
            >
              <img alt={name} src={pizza} className='pizzaImg'/>
              <span>{name}  {size}''</span>
            </div>
          )
        })}
      </div>
      <div className={`validation-error ${ sizeError? 'active' : null}`} key='error'>{sizeError && "Please selecte one size"}</div>
    </div>
  );

export default Sizes;
