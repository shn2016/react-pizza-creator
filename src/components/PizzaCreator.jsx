import React from 'react';
import Section from './Section';
import Sizes from './Sizes';
import Toppings from './Toppings';
import Summary from './Summary';
import ConfirmationModal from './ConfirmationModal';
import Button from './Button';
import getTotal from '../helper/getTotal';
import DetailsForm from './DetailsForm';
import PizzaViewer from './PizzaViewer';

export default class PizzaCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSize: null,
      selectedToppings: [],
      detailsFormData: {},
      detailsFormDirty: false,
      sizeError: false,
      showConfirmationModal: false,
      resetChild: false,
    };

    this.onToppingClick = this.onToppingClick.bind(this);
    this.onMinusToppingClick = this.onMinusToppingClick.bind(this);
    this.onAddToppingClick = this.onAddToppingClick.bind(this);
    this.onDetailsFormDataChange = this.onDetailsFormDataChange.bind(this);
    this.onPizzaSizeSelected = this.onPizzaSizeSelected.bind(this);
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
    this.onResetButtonClick = this.onResetButtonClick.bind(this);
    this.onPlaceButtonClick = this.onPlaceButtonClick.bind(this);
    this.resetFinished = this.resetFinished.bind(this);
  }

  // #region
  onToppingClick(topping) {
    const { selectedToppings } = this.state;
    const isExists = selectedToppings.find(({ name }) => name === topping.name);

    const newSelectedToppings = !isExists
      ? [...selectedToppings, { ...topping, amount: 1 }]
      : selectedToppings.filter(({ name }) => name !== topping.name);

    this.setState({
      selectedToppings: newSelectedToppings,
    });
  }

  onMinusToppingClick(topping) {
    const { selectedToppings } = this.state;

    const newSelectedToppings = selectedToppings.map((selectedTopping) => {
      const { name } = selectedTopping;

      if (name === topping.name) {
        const { amount } = topping;
        const newAmount = amount - 1;

        if (newAmount === 0) {
          return undefined;
        }

        return {
          ...topping,
          amount: newAmount,
        };
      }

      return selectedTopping;
    });

    this.setState({
      selectedToppings: newSelectedToppings.filter(newSelectedTopping => !!newSelectedTopping),
    });
  }

  onAddToppingClick(topping) {
    const { selectedToppings } = this.state;

    const newSelectedToppings = selectedToppings.map((selectedTopping) => {
      const { name } = selectedTopping;
      if (name === topping.name) {
        const { amount } = topping;
        const newAmount = amount + 1;

        return {
          ...topping,
          amount: newAmount,
        };
      }
      return selectedTopping;
    });

    this.setState({
      selectedToppings: newSelectedToppings,
    });
  }

  onDetailsFormDataChange(name, value) {
    const { detailsFormData } = this.state;

    const newDetailsFormData = {
      ...detailsFormData,
      [name]: value,
    };

    this.setState({
      detailsFormData: newDetailsFormData,
    });
  }

  onPizzaSizeSelected(pizzaSize) {
    const { selectedSize } = this.state;
    const newSize = (selectedSize === pizzaSize) ? null : pizzaSize;
    this.setState({
      selectedSize: newSize,
      sizeError: false,
    });
  }

  onCancelButtonClick() {
    this.setState({
      showConfirmationModal: false,
    });
  }

  onResetButtonClick() {
    this.setState({
      selectedSize: null,
      selectedToppings: [],
      detailsFormData: {},
      detailsFormDirty: false,
      sizeError: false,
      showConfirmationModal: false,
      resetChild: true,
    });
  }

  onPlaceButtonClick() {
    const { selectedSize } = this.state;

    this.setState({
      detailsFormDirty: true,
    });

    const validate = this.validateDetailsFormData();

    if (!selectedSize) {
      this.setState({
        sizeError: true,
      });
      return;
    }

    if (!validate) {
      return;
    }

    this.setState({
      showConfirmationModal: true,
    });
  }

  validateDetailsFormData() {
    const { detailsFormData } = this.state;
    if (Object.keys(detailsFormData).length !== 6) return false;
    return Object.values(detailsFormData).every(v => !!v);
  }

  resetFinished() {
    this.setState({
      resetChild: false,
    });
  }

  render() {
    const {
      selectedSize,
      detailsFormData,
      detailsFormDirty,
      selectedToppings,
      showConfirmationModal,
      sizeError,
      resetChild,
    } = this.state;

    return (
      <React.Fragment>
        {showConfirmationModal
          && (
            <ConfirmationModal
              details={detailsFormData}
              selectedSize={selectedSize}
              selectedToppings={selectedToppings}
              onClose={() => this.setState({ showConfirmationModal: false })}
            />
          )
        }
        <PizzaViewer
          selectedToppings={selectedToppings}
        />
        <div className="main">
          <Section title="Enter Your Details">
            <DetailsForm
              data={detailsFormData}
              dirty={detailsFormDirty}
              onDataChange={this.onDetailsFormDataChange}
              resetChild={resetChild}
              resetFinished={this.resetFinished}
            />
          </Section>
          <Section title="Pick Your Pizza">
            <Sizes
              selectedSize={selectedSize}
              sizeError={sizeError}
              onPizzaSizeSelected={this.onPizzaSizeSelected}
            />
          </Section>
          <Section title="Pick Your Toppings">
            <Toppings
              selectedToppings={selectedToppings}
              onToppingClick={this.onToppingClick}
            />
          </Section>
          <Section title="Summary">
            <Summary
              selectedToppings={selectedToppings}
              selectedSize={selectedSize}
              onAddToppingClick={this.onAddToppingClick}
              onMinusToppingClick={this.onMinusToppingClick}
            />
            <hr />
            <div className="total">
              {`Total: ${getTotal({ selectedToppings, selectedSize })}`}
            </div>
          </Section>
          <Section title="Summary">
            <Button
              onPlaceButtonClick={this.onPlaceButtonClick}
              onResetButtonClick={this.onResetButtonClick}
            />
          </Section>
        </div>
      </React.Fragment>
    );
  }
}
