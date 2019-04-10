import React from 'react';
import Section from './Section';
import Sizes from './Sizes';
import Toppings from './Toppings';
import Summary from './Summary';
import ConfirmationModal from './ConfirmationModal';
import Button from "./Button";
import toppings from '../data/toppings';
import pizzaSizes from '../data/sizes';
import getTotal from '../helper/getTotal'
import DetailsForm from './DetailsForm';
import PizzaViewer from './PizzaViewer';
export default class PizzaCreator extends React.Component  { 

  constructor(props){
      super(props);

      this.state = {
      pizzaSizes,
      selectedSize:null,
      toppings,
      selectedToppings: [],
      detailsFormData: {},
      detailsFormDirty: false,
      sizeError: false,
      showConfirmationModal: false,
    };

    this.onToppingClick = this.onToppingClick.bind(this); 
    this.onMinusToppingClick = this.onMinusToppingClick.bind(this); 
    this.onAddToppingClick = this.onAddToppingClick.bind(this); 
    this.onDetailsFormDataChange = this.onDetailsFormDataChange.bind(this); 
    this.onPizzaSizeSelected = this.onPizzaSizeSelected.bind(this); 
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this); 
    this.onResetButtonClick = this.onResetButtonClick.bind(this); 
    this.onPlaceButtonClick = this.onPlaceButtonClick.bind(this); 
  }; 

  //#region
  onToppingClick(topping) {

    const { selectedToppings } = this.state;
    const isExists = this.state.selectedToppings.find(({ name }) => name === topping.name);

    const newSelectedToppings = !isExists 
      ? [{ ...topping, amount: 1 }, ...selectedToppings] 
      : selectedToppings.filter(({ name }) => name !== topping.name);

    this.setState({
      selectedToppings : newSelectedToppings,
    });
  };

  onMinusToppingClick(topping) {
    const { selectedToppings } = this.state;

    const newSelectedToppings = selectedToppings.map(selectedTopping => {
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
        }
      }

      return selectedTopping;
    });

    this.setState({
      selectedToppings: newSelectedToppings.filter(newSelectedTopping => !!newSelectedTopping),
    })
  }

  onAddToppingClick(topping) {
    const { selectedToppings } = this.state;

    const newSelectedToppings = selectedToppings.map(selectedTopping => {
      const { name } = selectedTopping;
      if (name === topping.name) {
        const { amount } = topping;
        const newAmount = amount + 1;

        return {
          ...topping,
          amount: newAmount,
        }
      }
      return selectedTopping;
    });

    this.setState({
      selectedToppings : newSelectedToppings,
    })
  }

  onDetailsFormDataChange(name, value){
    const { detailsFormData } = this.state;

    const newDetailsFormData = {
      ...detailsFormData,
      [name]: value,
    };

    this.setState({
      detailsFormData: newDetailsFormData,
    });
  }
  
  onPizzaSizeSelected(pizzaSize){
    const { selectedSize } = this.state;
    const newSize = (selectedSize === pizzaSize) ? null : pizzaSize;
    this.setState({
      selectedSize: newSize,
      sizeError: false,
    })
  }

  onCancelButtonClick(){
    this.setState({
      showConfirmationModal: false,
    });
  };

  onResetButtonClick(){
    const { customer } = this.state;
    const newCustomer = {};

    Object.keys(customer).forEach(key =>{
      newCustomer[key] = null;
    });

    this.setState({
      selectedToppings: [],
      customer: newCustomer,
      selectedSize: null,
    })
  }

  validateDetailsFormData(data) {
    if(Object.keys(data).length !== 6 ) return false;
    return Object.values(data).every(v => !!v);
  }

  onPlaceButtonClick(){
    const { detailsFormData, selectedSize } = this.state;

    event.preventDefault();
    
    this.setState({
      detailsFormDirty: true,
    });
      
    let validate = this.validateDetailsFormData(detailsFormData);
    console.log(validate);
    if (!validate) {
      return;
    }
    if(!selectedSize) {
      this.setState({
        sizeError: true,
      });
      return;
    }
    this.setState({ 
      showConfirmationModal: true 
    });
  }
  //#endregion

  render(){
    const { 
      pizzaSizes,
      selectedSize,
      toppings,
      detailsFormData,
      detailsFormDirty,
      selectedToppings,
      showConfirmationModal,
      sizeError,
    } = this.state;

    return (
      <React.Fragment>
        {showConfirmationModal&&
          (<ConfirmationModal 
            details={detailsFormData}
            selectedSize={selectedSize}
            selectedToppings={selectedToppings}
            onClose={() => this.setState({ showConfirmationModal: false })}
          />)
        }
        <PizzaViewer
          selectedToppings = {selectedToppings}
        />
        <div className='main'>
          <Section title='Enter Your Details'>
            <DetailsForm
              data = {detailsFormData} 
              dirty = {detailsFormDirty}
              onDataChange = {this.onDetailsFormDataChange}
            />
          </Section>
          <Section title='Pick Your Pizza'>
            <Sizes 
              pizzaSizes = {pizzaSizes}
              selectedSize = {selectedSize}
              sizeError = {sizeError}
              onPizzaSizeSelected = {this.onPizzaSizeSelected}
            />
          </Section>
          <Section title='Pick Your Toppings'>
            <Toppings 
              toppings = {toppings}
              selectedToppings = {selectedToppings}
              onToppingClick  = {this.onToppingClick}
            />
          </Section>
          <Section title='Summary'>
            <Summary 
              selectedToppings = {selectedToppings}
              selectedSize = {selectedSize}
              onAddToppingClick = {this.onAddToppingClick}
              onMinusToppingClick = {this.onMinusToppingClick}
            />
            <hr/>
            <div className = 'total'>
              Total: {getTotal({ selectedToppings, selectedSize })}
            </div>
          </Section>
          <Section title='Summary'>
            <Button 
              onPlaceButtonClick = {this.onPlaceButtonClick}
              onResetButtonClick = {this.onResetButtonClick}
            />
          </Section>
        </div>
      </React.Fragment>
    );
  }
}