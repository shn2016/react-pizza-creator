import React from 'react';
import PropTypes from 'prop-types';
import getProductsByType from '../services/getProductsByType';
import ProductPropTypes from '../PropTypes/ProductPropTypes';

export default class Toppings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toppings: [],
    };
  }

  componentDidMount() {
    getProductsByType('toppings').then(({ data }) => {
      this.setToppingsState(data);
    });
  }

  setToppingsState(data) {
    this.setState({
      toppings: data,
    });
  }

  render() {
    const { selectedToppings, onToppingClick } = this.props;
    const { toppings } = this.state;
    return (
      <div className="toppings">
        {toppings.map((topping) => {
          const { name: toppingName } = topping;
          return (
            <div
              className={`topping ${selectedToppings.find(({ name }) => name === topping.name) ? 'active' : null}`}
              key={toppingName}
              onClick={() => onToppingClick(topping)}
            >
              <div className="img">
                <img
                  src={`https://toddmotto.com/angular-pizza-creator/assets/toppings/${toppingName}.svg`}
                  alt={toppingName}
                />
              </div>
              <span>{toppingName}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

Toppings.propTypes = {
  selectedToppings: PropTypes.arrayOf(PropTypes.shape(ProductPropTypes)).isRequired,
  onToppingClick: PropTypes.func.isRequired,
};
