import React from 'react';
import base from '../images/base.svg';
import board from '../images/board.svg';
import anchovyImg from '../images/anchovy.svg';
import baconImg from '../images/bacon.svg';
import chiliImg from '../images/chili.svg';
import basilImg from '../images/basil.svg';
import mozzarellaImg from '../images/mozzarella.svg';
import mushroomImg from '../images/mushroom.svg';
import oliveImg from '../images/olive.svg';
import onionImg from '../images/onion.svg';

function getImg (name) {
  switch(name){
    case 'anchovy': return anchovyImg;
    case 'bacon': return baconImg;
    case 'chili': return chiliImg;
    case 'basil': return basilImg;
    case 'mozzarella': return mozzarellaImg;
    case 'mushroom': return mushroomImg;
    case 'olive': return oliveImg;
    case 'onion': return onionImg;
    default: break;
  }
}
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
          {selectedToppings.map(selectedTopping => {
            return (
              <img
                key={selectedTopping.name}
                src={`https://toddmotto.com/angular-pizza-creator/assets/toppings/${selectedTopping.name}.svg`}
                alt={selectedTopping.name}
              />
            );
          })}
        </div>
      </div>
  </div>
);


export default Previewer;